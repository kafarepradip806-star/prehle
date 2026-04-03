"use client";
import { useState } from "react";
import AIChat from "./AIChat";

export default function AIBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <div onClick={() => setOpen(true)} style={bubble}>
          🤖
        </div>
      )}

      {open && <AIChat minimize={() => setOpen(false)} />}
    </>
  );
}

const bubble = {
  position: "fixed",
  bottom: 20,
  right: 20,
  width: 60,
  height: 60,
  borderRadius: "50%",
  background: "#D4AF37",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 26,
  cursor: "pointer",
  zIndex: 10000,
  boxShadow: "0 0 20px rgba(212,175,55,.8)",
};
