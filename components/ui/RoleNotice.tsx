"use client";
import { useEffect, useState } from "react";

export default function RoleNotice() {
  const [role,setRole]=useState<string|null>(null);

  useEffect(()=>setRole(localStorage.getItem("role")),[]);

  if(!role) return null;

  return (
    <div style={box}>
      {role==="client" && "You are logged in as Client"}
      {role==="admin" && "Admin Panel Active"}
    </div>
  );
}

const box={
  position:"fixed",
  bottom:90,
  right:20,
  padding:"12px 20px",
  background:"#3b82f6",
  borderRadius:20,
  color:"white",
  zIndex:99,
  boxShadow:"0 0 20px rgba(59,130,246,.7)"
};
