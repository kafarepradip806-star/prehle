import React, { useEffect, useMemo, useRef, useState } from "react";

type WorkspaceNode = {
  path: string;
  name: string;
  type: "file" | "dir";
  children?: WorkspaceNode[];
};

type FileExplorerProps = {
  selectedPath?: string | null;
  onSelectFile: (path: string) => void;
  className?: string;
  apiBaseUrl?: string;
  initialExpandedPaths?: string[];
  refreshToken?: number;
};

type FetchState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "ready" };

function joinUrl(base: string, path: string) {
  if (!base) return path;
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

function normalizeSlashes(p: string) {
  return p.replace(/\\/g, "/");
}

function compareNodes(a: WorkspaceNode, b: WorkspaceNode) {
  if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
  return a.name.localeCompare(b.name);
}

function buildPathIndex(root: WorkspaceNode | null) {
  const map = new Map<string, WorkspaceNode>();
  const walk = (n: WorkspaceNode) => {
    map.set(normalizeSlashes(n.path), n);
    if (n.type === "dir" && n.children) {
      for (const c of n.children) walk(c);
    }
  };
  if (root) walk(root);
  return map;
}

function getParentPath(path: string) {
  const p = normalizeSlashes(path).replace(/\/+$/, "");
  if (!p) return "";
  const idx = p.lastIndexOf("/");
  if (idx <= 0) return "";
  return p.slice(0, idx);
}

function getAncestors(path: string) {
  const list: string[] = [];
  let cur = normalizeSlashes(path);
  while (cur) {
    const parent = getParentPath(cur);
    if (!parent) break;
    list.push(parent);
    cur = parent;
  }
  return list;
}

function classNames(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(" ");
}

function Icon({ type, open }: { type: "file" | "dir"; open?: boolean }) {
  const color = type === "dir" ? "text-amber-600" : "text-slate-600";
  const glyph = type === "dir" ? (open ? "▾" : "▸") : "•";
  return <span className={classNames("inline-block w-4 text-center select-none", color)}>{glyph}</span>;
}

export default function FileExplorer(props: FileExplorerProps) {
  const {
    selectedPath,
    onSelectFile,
    className,
    apiBaseUrl = "",
    initialExpandedPaths = [],
    refreshToken,
  } = props;

  const [root, setRoot] = useState<WorkspaceNode | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>({ kind: "idle" });
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(initialExpandedPaths.map(normalizeSlashes)));
  const [filter, setFilter] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const normalizedSelected = selectedPath ? normalizeSlashes(selectedPath) : null;

  const index = useMemo(() => buildPathIndex(root), [root]);

  const loadTree = async () => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setFetchState({ kind: "loading" });

    try {
      const url = joinUrl(apiBaseUrl, "/api/workspace/tree");
      const res = await fetch(url, { signal: ac.signal });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Failed to load tree (${res.status})`);
      }
      const data = (await res.json()) as WorkspaceNode;
      const sortRec = (n: WorkspaceNode): WorkspaceNode => {
        if (n.type === "dir") {
          const children = (n.children ?? []).slice().sort(compareNodes).map(sortRec);
          return { ...n, children };
        }
        return n;
      };
      setRoot(sortRec(data));
      setFetchState({ kind: "ready" });
    } catch (e: any) {
      if (e?.name === "AbortError") return;
      setFetchState({ kind: "error", message: e?.message || "Failed to load workspace tree" });
    }
  };

  useEffect(() => {
    void loadTree();
    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiBaseUrl, refreshToken]);

  useEffect(() => {
    if (!normalizedSelected) return;
    const ancestors = getAncestors(normalizedSelected);
    if (ancestors.length === 0) return;
    setExpanded((prev) => {
      const next = new Set(prev);
      for (const a of ancestors) next.add(a);
      return next;
    });
  }, [normalizedSelected]);

  const toggleDir = (path: string) => {
    const p = normalizeSlashes(path);
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });
  };

  const expandAll = () => {
    if (!root) return;
    const all = new Set<string>();
    const walk = (n: WorkspaceNode) => {
      if (n.type === "dir") {
        all.add(normalizeSlashes(n.path));
        for (const c of n.children ?? []) walk(c);
      }
    };
    walk(root);
    setExpanded(all);
  };

  const collapseAll = () => {
    setExpanded(new Set());
  };

  const matchesFilter = (n: WorkspaceNode, needle: string): boolean => {
    if (!needle) return true;
    const s = needle.toLowerCase();
    if (n.name.toLowerCase().includes(s)) return true;
    if (normalizeSlashes(n.path).toLowerCase().includes(s)) return true;
    return false;
  };

  const filterTree = (n: WorkspaceNode, needle: string): WorkspaceNode | null => {
    if (!needle) return n;
    if (n.type === "file") return matchesFilter(n, needle) ? n : null;

    const children = (n.children ?? [])
      .map((c) => filterTree(c, needle))
      .filter(Boolean) as WorkspaceNode[];

    if (children.length > 0) return { ...n, children };
    return matchesFilter(n, needle) ? { ...n, children: [] } : null;
  };

  const filteredRoot = useMemo(() => {
    if (!root) return null;
    const needle = filter.trim();
    const fr = filterTree(root, needle);
    return fr;
  }, [root, filter]);

  const renderNode = (n: WorkspaceNode, depth: number) => {
    const p = normalizeSlashes(n.path);
    const isDir = n.type === "dir";
    const isOpen = isDir ? expanded.has(p) : false;
    const isSelected = normalizedSelected ? normalizedSelected === p : false;

    const indentStyle: React.CSSProperties = { paddingLeft: `${Math.min(24, depth * 12)}px` };

    if (isDir) {
      const hasChildren = (n.children ?? []).length > 0;
      return (
        <div key={p} className="select-none">
          <button
            type="button"
            className={classNames(
              "w-full flex items-center gap-2 rounded px-2 py-1 text-left",
              "hover:bg-slate-100",
              isSelected ? "bg-slate-200" : ""
            )}
            style={indentStyle}
            onClick={() => toggleDir(p)}
            aria-expanded={isOpen}
          >
            <Icon type="dir" open={isOpen} />
            <span className="truncate">{n.name || p || "workspace"}</span>
            {!hasChildren ? <span className="ml-auto text-xs text-slate-400">empty</span> : null}
          </button>
          {isOpen ? (
            <div>
              {(n.children ?? []).map((c) => renderNode(c, depth + 1))}
              {(n.children ?? []).length === 0 ? (
                <div className="px-2 py-1 text-xs text-slate-500" style={{ paddingLeft: `${Math.min(24, (depth + 1) * 12)}px` }}>
                  (empty)
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <div key={p} className="select-none">
        <button
          type="button"
          className={classNames(
            "w-full flex items-center gap-2 rounded px-2 py-1 text-left",
            "hover:bg-slate-100",
            isSelected ? "bg-blue-100" : ""
          )}
          style={indentStyle}
          onClick={() => onSelectFile(p)}
        >
          <Icon type="file" />
          <span className="truncate">{n.name}</span>
          <span className="ml-auto text-xs text-slate-400 truncate max-w-[40%]">{n.path}</span>
        </button>
      </div>
    );
  };

  const openSelectedInTree = () => {
    if (!normalizedSelected) return;
    const node = index.get(normalizedSelected);
    if (!node) return;
    const ancestors = getAncestors(normalizedSelected);
    setExpanded((prev) => {
      const next = new Set(prev);
      for (const a of ancestors) next.add(a);
      return next;
    });
  };

  return (
    <div className={classNames("h-full flex flex-col border-r border-slate-200 bg-white", className)}>
      <div className="p-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter files…"
            className="w-full rounded border border-slate-300 px-2 py-1 text-sm outline-none focus:border-slate-400"
          />
          <button
            type="button"
            className="rounded border border-slate-300 px-2 py-1 text-sm hover:bg-slate-50"
            onClick={() => void loadTree()}
            title="Refresh"
          >
            ↻
          </button>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs">
          <button
            type="button"
            className="rounded border border-slate-300 px-2 py-1 hover:bg-slate-50"
            onClick={expandAll}
            disabled={!root}
          >
            Expand all
          </button>
          <button
            type="button"
            className="rounded border border-slate-300 px-2 py-1 hover:bg-slate-50"
            onClick={collapseAll}
            disabled={!root}
          >
            Collapse all
          </button>
          <button
            type="button"
            className="rounded border border-slate-300 px-2 py-1 hover:bg-slate-50 ml-auto"
            onClick={openSelectedInTree}
            disabled={!normalizedSelected}
            title="Reveal selected file"
          >
            Reveal
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-1">
        {fetchState.kind === "loading" ? (
          <div className="p-3 text-sm text-slate-600">Loading…</div>
        ) : fetchState.kind === "error" ? (
          <div className="p-3 text-sm text-red-600">
            <div className="font-medium">Failed to load workspace</div>
            <div className="mt-1 whitespace-pre-wrap break-words">{fetchState.message}</div>
            <button
              type="button"
              className="mt-3 rounded border border-slate-300 px-2 py-1 text-sm hover:bg-slate-50"
              onClick={() => void loadTree()}
            >
              Retry
            </button>
          </div>
        ) : !filteredRoot ? (
          <div className="p-3 text-sm text-slate-600">{root ? "No matches." : "No workspace tree."}</div>
        ) : (
          <div className="text-sm">{renderNode(filteredRoot, 0)}</div>
        )}
      </div>
    </div>
  );
}
