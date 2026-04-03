import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ChatRole = "user" | "assistant" | "system";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  ts: number;
};

type FileEntry = {
  path: string;
  type: "file" | "dir";
  size?: number;
  mtime?: number;
};

type ApiError = {
  detail?: any;
  message?: string;
};

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE?.toString()?.replace(/\/+$/, "") ||
  "";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function formatBytes(bytes?: number) {
  if (bytes == null || Number.isNaN(bytes)) return "";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let v = bytes;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  const s = i === 0 ? `${Math.round(v)}` : v.toFixed(v < 10 ? 2 : 1);
  return `${s} ${units[i]}`;
}

function formatTime(ms?: number) {
  if (!ms) return "";
  try {
    const d = new Date(ms * 1000);
    return d.toLocaleString();
  } catch {
    return "";
  }
}

function joinPath(a: string, b: string) {
  const left = (a || "").replace(/\/+$/, "");
  const right = (b || "").replace(/^\/+/, "");
  if (!left) return right;
  if (!right) return left;
  return `${left}/${right}`;
}

function dirname(p: string) {
  const s = p.replace(/\/+$/, "");
  const idx = s.lastIndexOf("/");
  if (idx <= 0) return "";
  return s.slice(0, idx);
}

function basename(p: string) {
  const s = p.replace(/\/+$/, "");
  const idx = s.lastIndexOf("/");
  if (idx === -1) return s;
  return s.slice(idx + 1);
}

function isLikelyBinary(text: string) {
  for (let i = 0; i < Math.min(text.length, 2000); i++) {
    const c = text.charCodeAt(i);
    if (c === 0) return true;
  }
  return false;
}

function randomId() {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

async function api<T>(
  path: string,
  init?: RequestInit & { timeoutMs?: number }
): Promise<T> {
  const url = `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
  const ctrl = new AbortController();
  const timeoutMs = init?.timeoutMs ?? 120000;
  const t = window.setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
      signal: ctrl.signal,
    });
    if (!res.ok) {
      let payload: any = undefined;
      try {
        payload = await res.json();
      } catch {
        try {
          payload = await res.text();
        } catch {
          payload = undefined;
        }
      }
      const err: ApiError =
        typeof payload === "object" && payload !== null
          ? payload
          : { message: String(payload ?? res.statusText) };
      throw Object.assign(new Error(err.message || res.statusText), {
        status: res.status,
        payload: err,
      });
    }
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) return (await res.json()) as T;
    return (await res.text()) as unknown as T;
  } finally {
    window.clearTimeout(t);
  }
}

async function listDir(path: string): Promise<{ entries: FileEntry[] }> {
  const q = new URLSearchParams();
  if (path) q.set("path", path);
  return await api(`/api/files/list?${q.toString()}`, { method: "GET" });
}

async function readFile(path: string): Promise<{ path: string; content: string }> {
  const q = new URLSearchParams();
  q.set("path", path);
  return await api(`/api/files/read?${q.toString()}`, { method: "GET" });
}

async function writeFile(path: string, content: string): Promise<{ ok: boolean }> {
  return await api(`/api/files/write`, {
    method: "POST",
    body: JSON.stringify({ path, content }),
  });
}

type ChatRequest = {
  messages: Array<{ role: ChatRole; content: string }>;
};

type ChatResponse = {
  message?: { role: ChatRole; content: string };
  content?: string;
};

async function chat(req: ChatRequest): Promise<ChatResponse> {
  return await api(`/api/chat`, {
    method: "POST",
    body: JSON.stringify(req),
    timeoutMs: 300000,
  });
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

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";
  const isSystem = msg.role === "system";
  return (
    <div className={cx("w-full flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cx(
          "max-w-[92%] rounded-lg px-3 py-2 whitespace-pre-wrap break-words text-sm leading-relaxed",
          isSystem
            ? "bg-amber-50 text-amber-900 border border-amber-200"
            : isUser
            ? "bg-blue-600 text-white"
            : "bg-slate-100 text-slate-900 border border-slate-200"
        )}
      >
        {msg.content}
        <div
          className={cx(
            "mt-1 text-[11px] opacity-70",
            isUser ? "text-blue-100" : "text-slate-500"
          )}
        >
          {new Date(msg.ts).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}

function Splitter({
  onDrag,
}: {
  onDrag: (deltaX: number) => void;
}) {
  const draggingRef = useRef(false);
  const lastXRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      if (lastXRef.current == null) lastXRef.current = e.clientX;
      const dx = e.clientX - lastXRef.current;
      lastXRef.current = e.clientX;
      onDrag(dx);
    };
    const onUp = () => {
      draggingRef.current = false;
      lastXRef.current = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [onDrag]);

  return (
    <div
      className="w-2 cursor-col-resize bg-transparent hover:bg-slate-200 active:bg-slate-300 transition-colors"
      onMouseDown={(e) => {
        e.preventDefault();
        draggingRef.current = true;
        lastXRef.current = e.clientX;
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
      }}
      title="Drag to resize"
    />
  );
}

function ToolbarButton({
  children,
  onClick,
  disabled,
  title,
  variant = "default",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  variant?: "default" | "primary" | "danger";
}) {
  const base =
    "px-2 py-1 rounded text-sm border transition-colors select-none";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white border-blue-700 hover:bg-blue-700 disabled:bg-blue-300 disabled:border-blue-300"
      : variant === "danger"
      ? "bg-rose-600 text-white border-rose-700 hover:bg-rose-700 disabled:bg-rose-300 disabled:border-rose-300"
      : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50 disabled:bg-slate-100 disabled:text-slate-400";
  return (
    <button
      type="button"
      className={cx(base, styles)}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [leftWidth, setLeftWidth] = useLocalStorageState<number>(
    "workspace_leftWidth",
    360
  );
  const [dirPath, setDirPath] = useLocalStorageState<string>(
    "workspace_dirPath",
    ""
  );
  const [selectedPath, setSelectedPath] = useLocalStorageState<string>(
    "workspace_selectedPath",
    ""
  );
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [loadingEntries, setLoadingEntries] = useState(false);
  const [entryError, setEntryError] = useState<string>("");

  const [fileContent, setFileContent] = useState<string>("");
  const [originalContent, setOriginalContent] = useState<string>("");
  const [loadingFile, setLoadingFile] = useState(false);
  const [savingFile, setSavingFile] = useState(false);
  const [fileError, setFileError] = useState<string>("");

  const [messages, setMessages] = useLocalStorageState<ChatMessage[]>(
    "workspace_chatMessages",
    [
      {
        id: randomId(),
        role: "system",
        content:
          "You can chat here. Use the file explorer to open/edit files in the configured workspace.",
        ts: Date.now(),
      },
    ]
  );
  const [chatInput, setChatInput] = useState("");
  const [chatBusy, setChatBusy] = useState(false);
  const [chatError, setChatError] = useState<string>("");

  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  const dirty = useMemo(() => fileContent !== originalContent, [fileContent, originalContent]);

  const refreshList = useCallback(async () => {
    setLoadingEntries(true);
    setEntryError("");
    try {
      const res = await listDir(dirPath);
      const sorted = [...(res.entries || [])].sort((a, b) => {
        if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
        return a.path.localeCompare(b.path);
      });
      setEntries(sorted);
    } catch (e: any) {
      setEntryError(e?.payload?.detail?.toString?.() || e?.message || "Failed to list directory");
    } finally {
      setLoadingEntries(false);
    }
  }, [dirPath]);

  const openFile = useCallback(
    async (path: string) => {
      setSelectedPath(path);
      setLoadingFile(true);
      setFileError("");
      try {
        const res = await readFile(path);
        const content = res?.content ?? "";
        if (isLikelyBinary(content)) {
          setFileError("This file appears to be binary or contains null bytes; displaying as text may be unsafe.");
        }
        setFileContent(content);
        setOriginalContent(content);
        requestAnimationFrame(() => {
          editorRef.current?.focus();
        });
      } catch (e: any) {
        setFileError(e?.payload?.detail?.toString?.() || e?.message || "Failed to read file");
        setFileContent("");
        setOriginalContent("");
      } finally {
        setLoadingFile(false);
      }
    },
    [setSelectedPath]
  );

  const saveCurrentFile = useCallback(async () => {
    if (!selectedPath) return;
    setSavingFile(true);
    setFileError("");
    try {
      await writeFile(selectedPath, fileContent);
      setOriginalContent(fileContent);
    } catch (e: any) {
      setFileError(e?.payload?.detail?.toString?.() || e?.message || "Failed to save file");
    } finally {
      setSavingFile(false);
    }
  }, [selectedPath, fileContent]);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  useEffect(() => {
    const el = chatScrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, chatBusy]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        if (selectedPath) {
          e.preventDefault();
          void saveCurrentFile();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [saveCurrentFile, selectedPath]);

  const sendChat = useCallback(async () => {
    const text = chatInput.trim();
    if (!text || chatBusy) return;
    setChatError("");

    const userMsg: ChatMessage = {
      id: randomId(),
      role: "user",
      content: text,
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setChatBusy(true);

    try {
      const payload: ChatRequest = {
        messages: [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        })),
      };
      const res = await chat(payload);
      const content =
        res?.message?.content ??
        (typeof (res as any)?.content === "string" ? (res as any).content : "");
      const assistantMsg: ChatMessage = {
        id: randomId(),
        role: "assistant",
        content: content || "(no response)",
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e: any) {
      setChatError(e?.payload?.detail?.toString?.() || e?.message || "Chat request failed");
      const assistantMsg: ChatMessage = {
        id: randomId(),
        role: "assistant",
        content:
          "Error: Unable to get a response from the server. Check server logs and API configuration.",
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setChatBusy(false);
    }
  }, [chatInput, chatBusy, messages, setMessages]);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: randomId(),
        role: "system",
        content:
          "Chat cleared. You can continue chatting. Use the file explorer to open/edit files in the configured workspace.",
        ts: Date.now(),
      },
    ]);
    setChatError("");
  }, [setMessages]);

  const navigateUp = useCallback(() => {
    setDirPath((p) => dirname(p));
  }, [setDirPath]);

  const promptAndGo = useCallback(() => {
    const next = window.prompt("Enter directory path (relative to workspace):", dirPath);
    if (next == null) return;
    setDirPath(next.trim().replace(/^\/+/, "").replace(/\/+$/, ""));
  }, [dirPath, setDirPath]);

  const promptAndOpen = useCallback(() => {
    const next = window.prompt("Enter file path to open (relative to workspace):", selectedPath || "");
    if (next == null) return;
    const p = next.trim().replace(/^\/+/, "");
    if (!p) return;
    void openFile(p);
  }, [openFile, selectedPath]);

  const promptAndNewFile = useCallback(() => {
    const next = window.prompt("New file path (relative to workspace):", dirPath ? `${dirPath}/` : "");
    if (next == null) return;
    const p = next.trim().replace(/^\/+/, "");
    if (!p) return;
    setSelectedPath(p);
    setFileContent("");
    setOriginalContent("");
    setFileError("");
    requestAnimationFrame(() => editorRef.current?.focus());
  }, [dirPath]);

  const onSelectEntry = useCallback(
    (ent: FileEntry) => {
      if (ent.type === "dir") {
        setDirPath(ent.path);
        return;
      }
      if (dirty && selectedPath) {
        const ok = window.confirm(
          "You have unsaved changes. Discard changes and open another file?"
        );
        if (!ok) return;
      }
      void openFile(ent.path);
    },
    [dirty, openFile, selectedPath, setDirPath]
  );

  const leftWidthClamped = Math.max(260, Math.min(620, leftWidth));

  return (
    <div className="h-screen w-screen bg-white text-slate-900 flex flex-col">
      <header className="h-12 shrink-0 border-b border-slate-200 flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <div className="font-semibold">Workspace Chat</div>
          <div className="text-xs text-slate-500">
            {API_BASE ? `API: ${API_BASE}` : "API: (same origin)"}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ToolbarButton
            onClick={refreshList}
            disabled={loadingEntries}
            title="Refresh directory listing"
          >
            Refresh
          </ToolbarButton>
          <ToolbarButton onClick={promptAndGo} title="Change directory">
            Go to…
          </ToolbarButton>
          <ToolbarButton onClick={promptAndNewFile} title="Create a new file in editor">
            New file…
          </ToolbarButton>
          <ToolbarButton onClick={promptAndOpen} title="Open file by path">
            Open…
          </ToolbarButton>
          <ToolbarButton onClick={clearChat} title="Clear chat history">
            Clear chat
          </ToolbarButton>
        </div>
      </header>

      <div className="flex-1 min-h-0 flex">
        <aside
          className="h-full min-h-0 border-r border-slate-200 flex flex-col"
          style={{ width: leftWidthClamped }}
        >
          <div className="shrink-0 px-3 py-2 border-b border-slate-200 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-xs text-slate-500">Directory</div>
              <div className="text-sm font-medium truncate">
                {dirPath ? `/${dirPath}` : "/"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ToolbarButton onClick={navigateUp} disabled={!dirPath} title="Up one level">
                Up
              </ToolbarButton>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-auto">
            {entryError ? (
              <div className="p-3 text-sm text-rose-700">
                <div className="font-semibold mb-1">Error</div>
                <div className="whitespace-pre-wrap break-words">{entryError}</div>
              </div>
            ) : null}

            {loadingEntries ? (
              <div className="p-3 text-sm text-slate-500">Loading…</div>
            ) : (
              <div className="p-2">
                {entries.length === 0 ? (
                  <div className="p-2 text-sm text-slate-500">No entries</div>
                ) : null}
                <ul className="space-y-1">
                  {entries.map((ent) => {
                    const name = basename(ent.path);
                    const active = ent.type === "file" && ent.path === selectedPath;
                    return (
                      <li key={`${ent.type}:${ent.path}`}>
                        <button
                          type="button"
                          className={cx(
                            "w-full text-left px-2 py-1 rounded border text-sm flex items-center justify-between gap-2",
                            active
                              ? "bg-blue-50 border-blue-200"
                              : "bg-white border-transparent hover:border-slate-200 hover:bg-slate-50"
                          )}
                          onClick={() => onSelectEntry(ent)}
                          title={ent.path}
                        >
                          <div className="min-w-0 flex items-center gap-2">
                            <span
                              className={cx(
                                "inline-flex items-center justify-center w-5 h-5 rounded text-xs border",
                                ent.type === "dir"
                                  ? "bg-amber-50 border-amber-200 text-amber-800"
                                  : "bg-slate-50 border-slate-200 text-slate-700"
                              )}
                            >
                              {ent.type === "dir" ? "D" : "F"}
                            </span>
                            <span className="truncate">{name || ent.path}</span>
                          </div>
                          <div className="shrink-0 text-[11px] text-slate-500 flex items-center gap-2">
                            {ent.type === "file" ? (
                              <span>{formatBytes(ent.size)}</span>
                            ) : (
                              <span />
                            )}
                          </div>
                        </button>
                        <div className="px-2 pb-1 text-[11px] text-slate-400 truncate">
                          {ent.type === "file" && ent.mtime ? formatTime(ent.mtime) : "\u00A0"}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </aside>

        <Splitter
          onDrag={(dx) => {
            setLeftWidth((w) => Math.max(260, Math.min(620, w + dx)));
          }}
        />

        <main className="flex-1 min-w-0 min-h-0 flex flex-col">
          <div className="flex-1 min-h-0 grid grid-rows-2">
            <section className="min-h-0 border-b border-slate-200 flex flex-col">
              <div className="shrink-0 px-3 py-2 border-b border-slate-200 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs text-slate-500">Editor</div>
                  <div className="text-sm font-medium truncate">
                    {selectedPath ? `/${selectedPath}` : "(no file selected)"}
                    {selectedPath && dirty ? (
                      <span className="ml-2 text-xs text-amber-700 border border-amber-200 bg-amber-50 px-2 py-0.5 rounded">
                        Unsaved
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ToolbarButton
                    onClick={() => {
                      if (!selectedPath) return;
                      if (dirty) {
                        const ok = window.confirm("Discard local changes and reload from disk?");
                        if (!ok) return;
                      }
                      void openFile(selectedPath);
                    }}
                    disabled={!selectedPath || loadingFile}
                    title="Reload from disk"
                  >
                    Reload
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={saveCurrentFile}
                    disabled={!selectedPath || savingFile || loadingFile || !dirty}
                    title="Save (Ctrl/Cmd+S)"
                    variant="primary"
                  >
                    {savingFile ? "Saving…" : "Save"}
                  </ToolbarButton>
                </div>
              </div>

              {fileError ? (
                <div className="px-3 py-2 text-sm text-rose-700 border-b border-slate-200 bg-rose-50">
                  <div className="whitespace-pre-wrap break-words">{fileError}</div>
                </div>
              ) : null}

              <div className="flex-1 min-h-0">
                <textarea
                  ref={editorRef}
                  className={cx(
                    "w-full h-full resize-none p-3 font-mono text-[13px] leading-5 outline-none",
                    "bg-white"
                  )}
                  value={fileContent}
                  onChange={(e) => setFileContent(e.target.value)}
                  placeholder={
                    selectedPath
                      ? "Loading…"
                      : "Select a file from the explorer, or click “New file…” to start."
                  }
                  disabled={!selectedPath || loadingFile}
                  spellCheck={false}
                />
              </div>
            </section>

            <section className="min-h-0 flex flex-col">
              <div className="shrink-0 px-3 py-2 border-b border-slate-200 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs text-slate-500">Chat</div>
                  <div className="text-sm font-medium truncate">
                    Ask questions or request edits; file operations are constrained to the workspace.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ToolbarButton
                    onClick={() => {
                      if (!selectedPath) return;
                      const snippet = fileContent.slice(0, 8000);
                      const msg = `Context: I have the file "${selectedPath}" open.\n\n--- BEGIN FILE (truncated) ---\n${snippet}\n--- END FILE ---\n\nMy request:`;
                      setChatInput((prev) => (prev ? `${msg}\n\n${prev}` : msg));
                    }}
                    disabled={!selectedPath}
                    title="Insert current file into chat input (truncated)"
                  >
                    Insert file
                  </ToolbarButton>
                </div>
              </div>

              {chatError ? (
                <div className="px-3 py-2 text-sm text-rose-700 border-b border-slate-200 bg-rose-50">
                  <div className="whitespace-pre-wrap break-words">{chatError}</div>
                </div>
              ) : null}

              <div ref={chatScrollRef} className="flex-1 min-h-0 overflow-auto p-3 space-y-3 bg-white">
                {messages.map((m) => (
                  <MessageBubble key={m.id} msg={m} />
                ))}
                {chatBusy ? (
                  <div className="text-sm text-slate-500">Thinking…</div>
                ) : null}
              </div>

              <div className="shrink-0 border-t border-slate-200 p-3 bg-white">
                <form
                  className="flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    void sendChat();
                  }}
                >
                  <textarea
                    className="flex-1 min-h-[44px] max-h-40 resize-y p-2 border border-slate-300 rounded outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 text-sm"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your message… (Shift+Enter for newline)"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void sendChat();
                      }
                    }}
                    disabled={chatBusy}
                  />
                  <div className="flex flex-col gap-2">
                    <ToolbarButton
                      variant="primary"
                      disabled={chatBusy || !chatInput.trim()}
                      onClick={() => void sendChat()}
                      title="Send"
                    >
                      Send
                    </ToolbarButton>
                    <ToolbarButton
                      disabled={chatBusy}
                      onClick={() => setChatInput("")}
                      title="Clear input"
                    >
                      Clear
                    </ToolbarButton>
                  </div>
                </form>
                <div className="mt-2 text-[11px] text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span>
                    Tip: Ctrl/Cmd+S saves the current file.
                  </span>
                  <span>
                    Directory: <span className="font-mono">{dirPath ? `/${dirPath}` : "/"}</span>
                  </span>
                  {selectedPath ? (
                    <span>
                      File: <span className="font-mono">/{selectedPath}</span>
                    </span>
                  ) : null}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
