"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PrelheLogo from "@/components/brand/PrelheLogo";

export default function Hero() {
  const [role,setRole]=useState<string|null>(null);

  useEffect(()=>{
    setRole(localStorage.getItem("role"));
  },[]);

  return (
    <section style={bg}>
      {/* Glows */}
      <div style={glowBlue}></div>
      <div style={glowGold}></div>

      <div style={content}>
        <PrelheLogo size={100} />

        <h1 style={title}>
          Build <span style={gold}>Real Software</span> with AI
        </h1>

        <p style={tag}>
          PRELHE converts your idea into websites, apps and software
          using AI + Experts.
        </p>

        <div style={{marginTop:40}}>
          {!role && (
            <>
              <Link href="/login"><button style={btn}>Login</button></Link>
              <Link href="/register"><button style={btn2}>Start Free</button></Link>
            </>
          )}

          {role==="client" && (
            <Link href="/dashboard"><button style={btn}>Go to Dashboard</button></Link>
          )}

          {role==="admin" && (
            <Link href="/admin"><button style={btn}>Open Admin Panel</button></Link>
          )}
        </div>
      </div>
    </section>
  );
}

/* Styles */

const bg={
  minHeight:"100vh",
  background:"#020712",
  color:"white",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  textAlign:"center",
  position:"relative",
  overflow:"hidden"
};

const content={position:"relative",zIndex:2,maxWidth:900};

const glowBlue={
  position:"absolute",
  width:600,
  height:600,
  background:"#3b82f6",
  filter:"blur(180px)",
  top:-200,
  left:-200,
  opacity:.5
};

const glowGold={
  position:"absolute",
  width:600,
  height:600,
  background:"#D4AF37",
  filter:"blur(180px)",
  bottom:-200,
  right:-200,
  opacity:.4
};

const title={
  fontSize:70,
  fontWeight:900,
  lineHeight:1.1,
  marginTop:40
};

const gold={
  background:"linear-gradient(90deg,#D4AF37,#fff)",
  WebkitBackgroundClip:"text",
  WebkitTextFillColor:"transparent"
};

const tag={
  fontSize:22,
  color:"#aaa",
  marginTop:20
};

const btn={
  margin:10,
  padding:"16px 50px",
  background:"#D4AF37",
  border:"none",
  borderRadius:40,
  fontSize:18,
  cursor:"pointer",
  boxShadow:"0 0 40px rgba(212,175,55,.7)"
};

const btn2={
  ...btn,
  background:"transparent",
  color:"#D4AF37",
  border:"2px solid #D4AF37"
};
