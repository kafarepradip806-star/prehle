"use client";
import { useState } from "react";
import type { AIMessage } from "./types";
import Message from "./Message";

export default function AIChat() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;

    const userMsg: AIMessage = {
      id: crypto.randomUUID(),
      role: "user",
      time: Date.now(),
      blocks: [{ type: "text", value: input }],
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // 🔮 Demo AI response (future: backend)
    const aiMsg: AIMessage = {
      id: crypto.randomUUID(),
      role: "ai",
      time: Date.now(),
      blocks: [
        {
          type: "text",
          value:
            "Based on your requirement, here are some ready templates:",
        },
        {
          type: "template",
          id: "t1",
          name: "Business Website",
          price: 2999,
          preview: "https://demo.prelhe.com/business",
          buy: "https://buy.prelhe.com/business",
        },
      ],
    };

    setTimeout(() => {
      setMessages(prev => [...prev, aiMsg]);
    }, 500);
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* MESSAGES */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 16,
        }}
      >
        {messages.map(m => (
          <Message key={m.id} message={m} />
        ))}
      </div>

      {/* INPUT */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: 12,
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Tell me your requirement..."
          style={{
            flex: 1,
            padding: 10,
            background: "#00000055",
            color: "#fff",
            border: "none",
            borderRadius: 8,
          }}
        />
        <button
          onClick={send}
          style={{
            padding: "0 18px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
