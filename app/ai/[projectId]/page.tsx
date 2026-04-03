"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { sendAIMessage } from "@/lib/ai";

export default function AIProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();

  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;

    setMessages((m) => [...m, { role: "user", text: input }]);
    setLoading(true);
    setInput("");

    try {
      const res = await sendAIMessage(projectId, input);

      setMessages((m) => [
        ...m,
        { role: "ai", text: res.reply },
      ]);
    } catch (e: any) {
      setMessages((m) => [
        ...m,
        { role: "ai", text: "❌ AI error" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* CHAT */}
      <div style={{ flex: 1, padding: 20 }}>
        <h2>PRELHE AI</h2>

        <div style={{ height: "70vh", overflowY: "auto" }}>
          {messages.map((m, i) => (
            <div key={i}>
              <b>{m.role === "user" ? "You" : "AI"}:</b>{" "}
              {m.text}
            </div>
          ))}
          {loading && <p>AI is thinking...</p>}
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "100%", height: 80 }}
        />

        <button onClick={send}>Send</button>
      </div>

      {/* LIVE PREVIEW */}
      <iframe
        src={`http://localhost:3001/preview/${projectId}`}
        style={{
          width: "50%",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}
