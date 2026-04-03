export type Role = "system" | "user" | "assistant";

export interface ChatMessage {
  role: Role;
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
}

export interface ChatResponse {
  message: ChatMessage;
}

export interface WorkspaceInfo {
  workspace: string;
}

export interface ListFilesResponse {
  files: string[];
}

export interface ReadFileResponse {
  path: string;
  content: string;
}

export interface WriteFileRequest {
  path: string;
  content: string;
}

export interface WriteFileResponse {
  path: string;
  bytes: number;
}

export interface DeleteFileResponse {
  path: string;
  deleted: boolean;
}

export interface ApiErrorBody {
  detail?: string | { msg?: string; type?: string }[] | Record<string, any>;
}

const DEFAULT_BASE_URL = (() => {
  const envUrl = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined;
  if (envUrl && typeof envUrl === "string") return envUrl.replace(/\/+$/, "");
  return "";
})();

function joinUrl(base: string, path: string): string {
  if (!base) return path;
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

function asErrorMessage(status: number, body: any): string {
  const prefix = `HTTP ${status}`;
  if (!body) return prefix;
  if (typeof body === "string") return `${prefix}: ${body}`;
  const detail = (body as ApiErrorBody).detail;
  if (!detail) return prefix;
  if (typeof detail === "string") return `${prefix}: ${detail}`;
  if (Array.isArray(detail)) {
    const msgs = detail
      .map((d: any) => d?.msg ?? d?.message ?? JSON.stringify(d))
      .filter(Boolean)
      .join("; ");
    return msgs ? `${prefix}: ${msgs}` : prefix;
  }
  return `${prefix}: ${JSON.stringify(detail)}`;
}

async function requestJSON<T>(
  path: string,
  init: RequestInit & { baseUrl?: string } = {}
): Promise<T> {
  const baseUrl = init.baseUrl ?? DEFAULT_BASE_URL;
  const url = joinUrl(baseUrl, path);

  const headers = new Headers(init.headers ?? {});
  if (!headers.has("Content-Type") && init.body != null) headers.set("Content-Type", "application/json");
  if (!headers.has("Accept")) headers.set("Accept", "application/json");

  const res = await fetch(url, { ...init, headers });
  const contentType = res.headers.get("content-type") || "";

  let body: any = null;
  if (contentType.includes("application/json")) {
    try {
      body = await res.json();
    } catch {
      body = null;
    }
  } else {
    try {
      body = await res.text();
    } catch {
      body = null;
    }
  }

  if (!res.ok) {
    throw new Error(asErrorMessage(res.status, body));
  }

  return body as T;
}

export async function getWorkspaceInfo(baseUrl?: string): Promise<WorkspaceInfo> {
  return requestJSON<WorkspaceInfo>("/api/workspace", { method: "GET", baseUrl });
}

export async function listFiles(baseUrl?: string): Promise<string[]> {
  const data = await requestJSON<ListFilesResponse>("/api/files", { method: "GET", baseUrl });
  if (Array.isArray((data as any)?.files)) return (data as any).files;
  if (Array.isArray(data as any)) return data as any;
  return [];
}

export async function readFile(path: string, baseUrl?: string): Promise<ReadFileResponse> {
  const q = new URLSearchParams({ path });
  return requestJSON<ReadFileResponse>(`/api/file?${q.toString()}`, { method: "GET", baseUrl });
}

export async function writeFile(path: string, content: string, baseUrl?: string): Promise<WriteFileResponse> {
  const payload: WriteFileRequest = { path, content };
  return requestJSON<WriteFileResponse>("/api/file", {
    method: "PUT",
    body: JSON.stringify(payload),
    baseUrl,
  });
}

export async function deleteFile(path: string, baseUrl?: string): Promise<DeleteFileResponse> {
  const q = new URLSearchParams({ path });
  return requestJSON<DeleteFileResponse>(`/api/file?${q.toString()}`, { method: "DELETE", baseUrl });
}

export async function chatOnce(req: ChatRequest, baseUrl?: string): Promise<ChatResponse> {
  return requestJSON<ChatResponse>("/api/chat", {
    method: "POST",
    body: JSON.stringify(req),
    baseUrl,
  });
}

export type ChatStreamHandlers = {
  onToken?: (token: string) => void;
  onMessage?: (message: ChatMessage) => void;
  onError?: (error: Error) => void;
  onDone?: () => void;
};

function decodeSseDataLine(line: string): string | null {
  const trimmed = line.trimEnd();
  if (!trimmed.startsWith("data:")) return null;
  return trimmed.slice(5).trimStart();
}

export async function chatStream(
  req: ChatRequest,
  handlers: ChatStreamHandlers = {},
  baseUrl?: string
): Promise<void> {
  const url = joinUrl(baseUrl ?? DEFAULT_BASE_URL, "/api/chat/stream");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify({ ...req, stream: true }),
  });

  if (!res.ok) {
    let body: any = null;
    const contentType = res.headers.get("content-type") || "";
    try {
      body = contentType.includes("application/json") ? await res.json() : await res.text();
    } catch {
      body = null;
    }
    const err = new Error(asErrorMessage(res.status, body));
    handlers.onError?.(err);
    throw err;
  }

  if (!res.body) {
    const err = new Error("Streaming response has no body");
    handlers.onError?.(err);
    throw err;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let buffer = "";
  let assembled = "";
  let finalMessageEmitted = false;

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      let idx: number;
      while ((idx = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 1);

        const data = decodeSseDataLine(line);
        if (data == null) continue;
        if (data === "" ) continue;
        if (data === "[DONE]") {
          if (!finalMessageEmitted) {
            handlers.onMessage?.({ role: "assistant", content: assembled });
            finalMessageEmitted = true;
          }
          handlers.onDone?.();
          return;
        }

        try {
          const payload = JSON.parse(data);
          if (typeof payload?.token === "string") {
            assembled += payload.token;
            handlers.onToken?.(payload.token);
          } else if (typeof payload?.delta === "string") {
            assembled += payload.delta;
            handlers.onToken?.(payload.delta);
          } else if (typeof payload?.content === "string") {
            assembled += payload.content;
            handlers.onToken?.(payload.content);
          } else if (payload?.message && typeof payload.message?.content === "string") {
            assembled = String(payload.message.content);
          }
          if (payload?.done === true) {
            if (!finalMessageEmitted) {
              handlers.onMessage?.({ role: "assistant", content: assembled });
              finalMessageEmitted = true;
            }
            handlers.onDone?.();
            return;
          }
        } catch {
          assembled += data;
          handlers.onToken?.(data);
        }
      }
    }

    if (!finalMessageEmitted) {
      handlers.onMessage?.({ role: "assistant", content: assembled });
      finalMessageEmitted = true;
    }
    handlers.onDone?.();
  } catch (e: any) {
    const err = e instanceof Error ? e : new Error(String(e));
    handlers.onError?.(err);
    throw err;
  } finally {
    try {
      reader.releaseLock();
    } catch {}
  }
}

export const api = {
  getWorkspaceInfo,
  listFiles,
  readFile,
  writeFile,
  deleteFile,
  chatOnce,
  chatStream,
};
