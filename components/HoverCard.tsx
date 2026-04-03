"use client";
import { useState } from "react";

export default function HoverCard({ children }) {
  const [h,setH]=useState(false);

  return (
    <div
      onMouseEnter={()=>setH(true)}
      onMouseLeave={()=>setH(false)}
      style={{
        background:"linear-gradient(180deg,#0F2A44,#050c18)",
        padding:40,
        borderRadius:22,
        transform: h ? "translateY(-12px) scale(1.03)" : "translateY(0)",
        boxShadow: h
          ? "0 40px 100px rgba(212,175,55,.35)"
          : "0 20px 50px rgba(0,0,0,.7)",
        border: h
          ? "1px solid rgba(212,175,55,.6)"
          : "1px solid rgba(255,255,255,.05)",
        transition:"all .45s cubic-bezier(.2,.8,.2,1)",
        cursor:"pointer"
      }}
    >
      {children}
    </div>
  );
}
