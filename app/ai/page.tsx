"use client";

import { useState } from "react";

export default function AIPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMsg] }),
    });

    const data = await res.json();
    setMessages((m) => [...m, data.reply]);
    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Prelhe AutoDev AI</h1>

      <div className="border p-4 h-[400px] overflow-y-auto mb-4">
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
        {loading && <div>AI typing...</div>}
      </div>

      <div className="flex gap-2">
        <input
          className="border p-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your project..."
        />
        <button onClick={send} className="bg-black text-white px-4">
          Send
        </button>
      </div>
    </div>
  );
}
