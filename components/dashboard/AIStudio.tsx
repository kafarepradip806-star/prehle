"use client";
import { useState } from "react";
import Message from "@/components/ai/Message";

export default function AIStudio() {
  const [messages,setMessages]=useState([
    {me:false,text:"Hello! Tell me what you want to build."}
  ]);
  const [msg,setMsg]=useState("");

  const send=()=>{
    if(!msg) return;
    setMessages([...messages,{me:true,text:msg},{me:false,text:"Got it. Generating design..."}]);
    setMsg("");
  };

  return (
    <div style={wrap}>
      <h2>AI Studio</h2>

      <div style={chat}>
        {messages.map((m,i)=><Message key={i} {...m} />)}
      </div>

      <div style={inputRow}>
        <input value={msg} onChange={e=>setMsg(e.target.value)} style={input}/>
        <button onClick={send} style={btn}>Send</button>
      </div>
    </div>
  );
}

const wrap={
  background:"#020712",
  padding:30,
  borderRadius:20,
  height:"100%",
  display:"flex",
  flexDirection:"column"
};

const chat={flex:1,overflow:"auto",marginBottom:20};

const inputRow={display:"flex",gap:10};

const input={flex:1,padding:12,borderRadius:20,border:"none"};

const btn={
  background:"#D4AF37",
  border:"none",
  padding:"12px 30px",
  borderRadius:20
};
