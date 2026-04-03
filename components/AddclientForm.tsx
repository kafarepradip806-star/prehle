"use client";
import { useState } from "react";

export default function AddClientForm({ onAdded }) {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [mobile,setMobile] = useState("");

  const add = async () => {
    if (!name || !email || !mobile) {
      alert("Fill all fields");
      return;
    }

    await fetch("/api/clients", {
      method: "POST",
      body: JSON.stringify({ name, email, mobile }),
    });

    setName("");
    setEmail("");
    setMobile("");
    onAdded();
  };

  return (
    <div style={{ background:"#0F2A44", padding:30, borderRadius:20 }}>
      <h2>Add Client</h2>

      <input placeholder="Client Name" value={name} onChange={e=>setName(e.target.value)} style={inp}/>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={inp}/>
      <input placeholder="Mobile" value={mobile} onChange={e=>setMobile(e.target.value)} style={inp}/>

      <button onClick={add} style={btn}>Add Client</button>
    </div>
  );
}

const inp = {
  width:"100%",
  padding:12,
  margin:"12px 0",
  borderRadius:8,
  border:"none",
  background:"#0A1931",
  color:"white"
};

const btn = {
  background:"#D4AF37",
  padding:"12px 20px",
  borderRadius:10,
  border:"none",
  fontWeight:700,
  cursor:"pointer"
};
