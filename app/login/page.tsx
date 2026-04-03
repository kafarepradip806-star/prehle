"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const router = useRouter();

  const login = async ()=>{
    try{
      const res = await api("/auth/login",{
        method:"POST",
        body:JSON.stringify({email,password})
      });

      if(res.token){
        const payload = JSON.parse(atob(res.token.split(".")[1]));

        localStorage.setItem("token",res.token);
        localStorage.setItem("role",payload.role);

        if(payload.role==="admin"){
          router.push("/admin");
        }else{
          router.push("/dashboard");
        }
      }else{
        setError("Invalid email or password");
      }
    }catch(e){
      setError("Server not reachable");
    }
  };

  return (
    <div style={bg}>
      <div style={card}>
        <h2>Login to PRELHE</h2>

        <input placeholder="Email" style={inp} value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" style={inp} value={password} onChange={e=>setPassword(e.target.value)} />

        {error && <p style={{color:"red"}}>{error}</p>}

        <button style={btn} onClick={login}>Login</button>

        <p style={{marginTop:20,color:"#aaa"}}>
          Don’t have an account? <a href="/register">Create one</a>
        </p>
      </div>
    </div>
  );
}

const bg={
  minHeight:"100vh",
  background:"linear-gradient(135deg,#050c18,#0f2a44)",
  display:"flex",
  alignItems:"center",
  justifyContent:"center"
};

const card={
  background:"#0a1931",
  padding:50,
  borderRadius:20,
  width:"100%",
  maxWidth:420,
  color:"white",
  boxShadow:"0 40px 120px rgba(0,0,0,.8)"
};

const inp={
  width:"100%",
  padding:14,
  margin:"12px 0",
  background:"#050c18",
  border:"none",
  borderRadius:10,
  color:"white",
  fontSize:16
};

const btn={
  width:"100%",
  marginTop:20,
  padding:14,
  background:"#D4AF37",
  border:"none",
  borderRadius:30,
  fontSize:18,
  cursor:"pointer"
};
