"use client";
import { useState } from "react";
import AIChat from "./AIChat";

export default function FloatingAI() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white"
      >
        AI
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-[360px] h-[500px] shadow-xl">
          <AIChat />
        </div>
      )}
    </>
  );
}
