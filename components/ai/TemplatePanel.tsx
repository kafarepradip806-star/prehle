"use client";
import type { TemplateItem } from "./types";

export default function TemplatePanel({
  templates = [],
}: {
  templates?: TemplateItem[];
}) {
  return (
    <div className="grid gap-3">
      {templates.map(t => (
        <a
          key={t.id}
          href={t.link}
          target="_blank"
          className="border p-3 rounded hover:bg-white/5"
        >
          <h4>{t.name}</h4>
          <p className="text-xs opacity-60">
            {t.stack?.join(", ")}
          </p>
        </a>
      ))}
    </div>
  );
}
