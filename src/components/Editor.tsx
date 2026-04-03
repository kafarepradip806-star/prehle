import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  path?: string | null;
  className?: string;
  onSaved?: (path: string) => void;
};

type ApiError = {
  detail?: any;
};

function joinUrl(base: string, path: string) {
  if (!base) return path;
  if (base.endsWith("/") && path.startsWith("/")) return base + path.slice(1);
  if (!base.endsWith("/") && !path.startsWith("/")) return base + "/" + path;
  return base + path;
}

function getApiBase() {
  const fromEnv = (import.meta as any)?.env?.VITE_API_BASE as string | undefined;
  return (fromEnv ?? "").trim();
}

function isTextLikely(contentType: string | null) {
  if (!contentType) return true;
  const ct = contentType.toLowerCase();
  if (ct.startsWith("text/")) return true;
  if (ct.includes("json")) return true;
  if (ct.includes("xml")) return true;
  if (ct.includes("yaml") || ct.includes("yml")) return true;
  if (ct.includes("javascript")) return true;
  if (ct.includes("typescript")) return true;
  if (ct.includes("markdown")) return true;
  return false;
}

async function safeReadText(res: Response): Promise<string> {
  const ct = res.headers.get("content-type");
  if (isTextLikely(ct)) return await res.text();
  const buf = await res.arrayBuffer();
  const view = new Uint8Array(buf);
  const isBinary = view.some((b) => b === 0);
  if (isBinary) return "";
  try {
    return new TextDecoder("utf-8", { fatal: false }).decode(view);
  } catch {
    return "";
  }
}

async function parseError(res: Response): Promise<string> {
  try {
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      const j = (await res.json()) as ApiError;
      if (typeof j?.detail === "string") return j.detail;
      if (Array.isArray(j?.detail)) return j.detail.map(String).join("\n");
      if (j?.detail != null) return JSON.stringify(j.detail);
      return `Request failed (${res.status})`;
    }
    const t = await res.text();
    return t || `Request failed (${res.status})`;
  } catch {
    return `Request failed (${res.status})`;
  }
}

export default function Editor({ path, className, onSaved }: Props) {
  const apiBase = useMemo(() => getApiBase(), []);
  const [content, setContent] = useState<string>("");
  const [original, setOriginal] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [readOnlyHint, setReadOnlyHint] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const lastPathRef = useRef<string | null>(null);

  const dirty = useMemo(() => content !== original, [content, original]);
  const canLoad = Boolean(path && path.trim().length > 0);

  useEffect(() => {
    setError(null);
    setStatus(null);
    setReadOnlyHint(null);

    if (!canLoad) {
      setContent("");
      setOriginal("");
      lastPathRef.current = null;
      return;
    }

    const p = (path || "").trim();
    if (lastPathRef.current === p) return;
    lastPathRef.current = p;

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setLoading(true);
    setError(null);
    setStatus("Loading...");
    setReadOnlyHint(null);

    (async () => {
      try {
        const url = joinUrl(apiBase, "/api/files/read");
        const res = await fetch(url, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ path: p }),
          signal: ac.signal,
        });
        if (!res.ok) {
          const msg = await parseError(res);
          throw new Error(msg);
        }

        const text = await safeReadText(res);
        setContent(text);
        setOriginal(text);
        setStatus("Loaded");
        if (text === "" && res.headers.get("content-type") && !isTextLikely(res.headers.get("content-type"))) {
          setReadOnlyHint("This file may be binary or not decodable as text.");
        } else {
          setReadOnlyHint(null);
        }
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        setError(e?.message || String(e));
        setStatus(null);
        setContent("");
        setOriginal("");
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      ac.abort();
    };
  }, [apiBase, canLoad, path]);

  const doSave = async () => {
    if (!canLoad || !path) return;
    const p = path.trim();
    setSaving(true);
    setError(null);
    setStatus("Saving...");
    try {
      const url = joinUrl(apiBase, "/api/files/write");
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ path: p, content }),
      });
      if (!res.ok) {
        const msg = await parseError(res);
        throw new Error(msg);
      }
      setOriginal(content);
      setStatus("Saved");
      onSaved?.(p);
    } catch (e: any) {
      setError(e?.message || String(e));
      setStatus(null);
    } finally {
      setSaving(false);
    }
  };

  const doRevert = () => {
    setContent(original);
    setStatus("Reverted");
    setError(null);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/.test(navigator.platform);
    const mod = isMac ? e.metaKey : e.ctrlKey;
    if (mod && e.key.toLowerCase() === "s") {
      e.preventDefault();
      if (!saving && dirty) void doSave();
    }
  };

  return (
    <div className={className ?? ""}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="min-w-0">
          <div className="text-sm font-medium truncate">
            {canLoad ? path : "No file selected"}
            {canLoad && dirty ? <span className="ml-2 text-xs text-orange-600 align-middle">● unsaved</span> : null}
          </div>
          <div className="text-xs text-gray-500">
            {loading ? "Loading..." : saving ? "Saving..." : status ? status : readOnlyHint ? readOnlyHint : " "}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="px-3 py-1.5 text-sm rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={doRevert}
            disabled={!canLoad || loading || saving || !dirty}
            title="Revert changes"
          >
            Revert
          </button>
          <button
            type="button"
            className="px-3 py-1.5 text-sm rounded bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => void doSave()}
            disabled={!canLoad || loading || saving || !dirty}
            title="Save (Ctrl/⌘+S)"
          >
            Save
          </button>
        </div>
      </div>

      {error ? (
        <div className="mb-2 px-3 py-2 text-sm rounded border border-red-200 bg-red-50 text-red-700 whitespace-pre-wrap">
          {error}
        </div>
      ) : null}

      <textarea
        className="w-full h-[60vh] font-mono text-sm p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={canLoad ? "Loading file..." : "Select a file to view/edit"}
        spellCheck={false}
        disabled={!canLoad || loading}
      />
    </div>
  );
}
