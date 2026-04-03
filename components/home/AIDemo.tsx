"use client";
import { useState } from "react";

export default function AIDemo() {
  const [msg,setMsg]=useState("");
  const [chat,setChat]=useState<string[]>([]);
  const [count,setCount]=useState(0);

  const send=()=>{
    if(!msg) return;

    const newChat=[...chat,"You: "+msg,"AI: I can build that. Login to continue."];
    setChat(newChat);
    setMsg("");
    setCount(count+1);

    if(count>=1){
      newChat.push("AI: Please login to continue this project.");
      setChat([...newChat]);
    }
  };

  return (
    <div style={box}>
      <h3>Try PRELHE AI (Demo)</h3>
      <div style={chatBox}>
        {chat.map((c,i)=><div key={i}>{c}</div>)}
      </div>

      <input 
        value={msg}
        onChange={e=>setMsg(e.target.value)}
        placeholder="Describe your project..."
        style={input}
      />
      <button onClick={send} style={btn}>Send</button>
    </div>
  );
}

const box={
  background:"#0f2a44",
  padding:30,
  borderRadius:20,
  maxWidth:500,
  margin:"auto",
  boxShadow:"0 0 40px rgba(59,130,246,.4)"
};

const chatBox={height:150,overflow:"auto",color:"#ccc",marginBottom:10};

const input={width:"100%",padding:10,borderRadius:10,border:"none",marginBottom:10};

const btn={background:"#D4AF37",border:"none",padding:"10px 20px",borderRadius:20};
