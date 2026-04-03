"use client";
import { useState } from "react";

export default function LoginForm(){
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");

  const login=()=>{
    if(email==="admin@prelhe.in" && pass==="prelhe123"){
      alert("Admin Login Successful");
      window.location.href="/admin";
    }
    else if(email==="client@prelhe.in" && pass==="client123"){
      alert("Client Login Successful");
      window.location.href="/dashboard";
    }
    else{
      alert("Invalid credentials");
    }
  }

  return (
    <div style={{
      background:"#0F2A44",
      padding:60,
      borderRadius:20,
      boxShadow:"0 40px 100px rgba(0,0,0,.7)",
      width:400
    }}>
      <h2 style={{textAlign:"center",marginBottom:30}}>Login to PRELHE</h2>

      <input
        placeholder="Email"
        onChange={e=>setEmail(e.target.value)}
        style={{
          width:"100%",
          padding:14,
          marginBottom:20,
          borderRadius:10,
          border:"none"
        }}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={e=>setPass(e.target.value)}
        style={{
          width:"100%",
          padding:14,
          marginBottom:30,
          borderRadius:10,
          border:"none"
        }}
      />

      <button onClick={login} style={{
        width:"100%",
        background:"#D4AF37",
        padding:14,
        border:"none",
        borderRadius:10,
        fontWeight:700
      }}>
        Login
      </button>

      <p style={{color:"#aaa",textAlign:"center",marginTop:20}}>
        Admin → admin@prelhe.in / prelhe123  
        Client → client@prelhe.in / client123
      </p>
    </div>
  );
}
