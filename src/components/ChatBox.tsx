import React, { useEffect, useMemo, useRef, useState } from "react";

type Role = "user" | "assistant" | "system" | "tool";

export type ChatMessage = {
  id: string;
  role: Role;
  content: string;
  createdAt?: number;
};

type Props = {
  apiBaseUrl?: string;
  className?: string;
  title?: string;
};

type ChatResponse = {
  message?: string;
  error?: string;
};

const DEFAULT_API_BASE_URL = "";

function cn(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

function genId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatTime(ts?: number) {
  if (!ts) return "";
  try {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

function useLocalStorageState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return initial;
      return JSON.parse(raw) as T;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  }, [key, value]);

  return [value, setValue] as const;
}

async function postJson(url: string, body: unknown, signal?: AbortSignal) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
  const contentType = res.headers.get("content-type") || "";
  let payload: any = null;
  if (contentType.includes("application/json")) {
    payload = await res.json().catch(() => null);
  } else {
    payload = await res.text().catch(() => "");
  }
  if (!res.ok) {
    const msg =
      (payload && typeof payload === "object" && (payload.error || payload.detail)) ||
      (typeof payload === "string" ? payload : "") ||
      `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return payload;
}

export default function ChatBox({
  apiBaseUrl = DEFAULT_API_BASE_URL,
  className,
  title = "Chat",
}: Props) {
  const [messages, setMessages] = useLocalStorageState<ChatMessage[]>("workspace-chat-messages", [
    {
      id: genId(),
      role: "assistant",
      content:
        "Hi! Ask me questions about your workspace, or ask me to read/edit files within it. Describe what you want to do.",
      createdAt: Date.now(),
    },
  ]);

  const [input, setInput] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const apiUrl = useMemo(() => {
    const base = (apiBaseUrl || "").trim();
    if (!base) return "/api/chat";
    return base.endsWith("/") ? `${base}api/chat` : `${base}/api/chat`;
  }, [apiBaseUrl]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length, isSending]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        textareaRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const canSend = useMemo(() => input.trim().length > 0 && !isSending, [input, isSending]);

  const resetConversation = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsSending(false);
    setError(null);
    setMessages([
      {
        id: genId(),
        role: "assistant",
        content:
          "Conversation reset. Tell me what you want to do in the workspace (read/list/edit files).",
        createdAt: Date.now(),
      },
    ]);
    setInput("");
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  const stopGenerating = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsSending(false);
    setError(null);
  };

  const sendMessage = async () => {
    if (!canSend) return;
    const trimmed = input.trim();
    setInput("");
    setError(null);

    const userMsg: ChatMessage = {
      id: genId(),
      role: "user",
      content: trimmed,
      createdAt: Date.now(),
    };

    const assistantPlaceholder: ChatMessage = {
      id: genId(),
      role: "assistant",
      content: "",
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg, assistantPlaceholder]);
    setIsSending(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const payload = await postJson(
        apiUrl,
        {
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        },
        controller.signal
      );

      const parsed: ChatResponse =
        payload && typeof payload === "object"
          ? (payload as ChatResponse)
          : { message: String(payload ?? "") };

      const assistantText = (parsed.message ?? "").toString();
      const err = parsed.error ? String(parsed.error) : null;

      if (err) throw new Error(err);

      setMessages((prev) => {
        const next = [...prev];
        const idx = next.findIndex((m) => m.id === assistantPlaceholder.id);
        if (idx >= 0) next[idx] = { ...next[idx], content: assistantText, createdAt: Date.now() };
        else next.push({ id: genId(), role: "assistant", content: assistantText, createdAt: Date.now() });
        return next;
      });
    } catch (e: any) {
      const msg =
        e?.name === "AbortError"
          ? "Stopped."
          : (e?.message ? String(e.message) : "Failed to send message.");
      setError(msg);
      setMessages((prev) => {
        const next = [...prev];
        const idx = next.findIndex((m) => m.id === assistantPlaceholder.id);
        if (idx >= 0) next[idx] = { ...next[idx], content: msg };
        return next;
      });
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setIsSending(false);
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  };

  const onSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await sendMessage();
  };

  const onInputKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await sendMessage();
      return;
    }
  };

  return (
    <div
      className={cn(
        "w-full h-full flex flex-col rounded-lg border border-slate-200 bg-white text-slate-900",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
        <div className="flex items-baseline gap-2 min-w-0">
          <div className="font-semibold truncate">{title}</div>
          <div className="text-xs text-slate-500 truncate">
            Ctrl/⌘K to focus • Enter to send • Shift+Enter for newline
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isSending ? (
            <button
              type="button"
              onClick={stopGenerating}
              className="px-3 py-1.5 text-sm rounded-md border border-slate-300 hover:bg-slate-50"
              title="Stop generating"
            >
              Stop
            </button>
          ) : null}
          <button
            type="button"
            onClick={resetConversation}
            className="px-3 py-1.5 text-sm rounded-md border border-slate-300 hover:bg-slate-50"
            title="Reset conversation"
          >
            Reset
          </button>
        </div>
      </div>

      <div ref={listRef} className="flex-1 overflow-auto px-4 py-4 space-y-4">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}

        {isSending ? (
          <div className="text-xs text-slate-500 px-2">Generating…</div>
        ) : null}

        {error ? (
          <div className="text-xs text-red-600 px-2 break-words">{error}</div>
        ) : null}
      </div>

      <form onSubmit={onSubmit} className="border-t border-slate-200 p-3">
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Send a message…"
              rows={2}
              className="w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400"
              disabled={isSending}
            />
            <div className="mt-1 text-[11px] text-slate-500 flex justify-between">
              <span className="truncate">Only files within the configured workspace can be accessed.</span>
              <span className="tabular-nums">{input.trim().length > 0 ? `${input.trim().length} chars` : ""}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSend}
            className={cn(
              "h-10 px-4 rounded-md text-sm font-medium border",
              canSend
                ? "bg-slate-900 text-white border-slate-900 hover:bg-slate-800"
                : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
            )}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";
  const isSystem = message.role === "system";
  const isTool = message.role === "tool";

  const header = isUser ? "You" : isAssistant ? "Assistant" : isSystem ? "System" : "Tool";

  const bubbleBase =
    "max-w-[900px] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 border text-sm leading-relaxed";

  const bubbleClass = isUser
    ? "ml-auto bg-slate-900 text-white border-slate-900"
    : isSystem
      ? "mr-auto bg-amber-50 text-amber-950 border-amber-200"
      : isTool
        ? "mr-auto bg-indigo-50 text-indigo-950 border-indigo-200"
        : "mr-auto bg-white text-slate-900 border-slate-200";

  const wrapClass = isUser ? "flex justify-end" : "flex justify-start";

  return (
    <div className={wrapClass}>
      <div className="max-w-full">
        <div className={cn(bubbleBase, bubbleClass)}>
          <div className={cn("mb-1 text-[11px] opacity-80 flex items-center justify-between gap-3")}>
            <span className="font-medium">{header}</span>
            <span className="tabular-nums">{formatTime(message.createdAt)}</span>
          </div>
          <div>{message.content || (isAssistant ? "…" : "")}</div>
        </div>
      </div>
    </div>
  );
}
