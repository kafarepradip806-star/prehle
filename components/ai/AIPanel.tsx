"use client";
import { useState } from "react";

export default function AIPanel({ close }: any) {
  const [chat,setChat]=useState<string[]>([]);
  const [msg,setMsg]=useState("");

  const send=()=>{
    if(!msg) return;
    setChat([...chat,"You: "+msg,"AI: Got it. Login to continue."]);
    setMsg("");
  };

  return (
    <div style={panel}>
      <h3>PRELHE AI</h3>
      <div style={box}>
        {chat.map((c,i)=><div key={i}>{c}</div>)}
      </div>
      <input value={msg} onChange={e=>setMsg(e.target.value)} style={input}/>
      <button onClick={send} style={btn}>Send</button>
      <button onClick={close} style={closeBtn}>×</button>
    </div>
  );
}

const panel={
  position:"fixed",
  right:0,
  top:0,
  width:360,
  height:"100vh",
  background:"#0f2a44",
  color:"white",
  padding:20,
  zIndex:99,
  boxShadow:"-10px 0 40px rgba(0,0,0,.8)"
};

const box={height:300,overflow:"auto",marginBottom:10};
const input={width:"100%",padding:10,borderRadius:10};
const btn={background:"#D4AF37",border:"none",padding:10,borderRadius:10,width:"100%"};
const closeBtn={position:"absolute",top:10,right:10};
