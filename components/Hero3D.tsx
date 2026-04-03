"use client";
import { useEffect, useState } from "react";

export default function Hero3D(){
  const [m,setM]=useState({x:0,y:0});
  useEffect(()=>{
    window.addEventListener("mousemove",e=>{
      setM({x:(e.clientX-window.innerWidth/2)/40,y:(e.clientY-window.innerHeight/2)/40})
    });
  },[]);

  return (
    <div style={{
      height:"100vh",
      background:"radial-gradient(circle at top,#142f52,#050c18)",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      textAlign:"center",
      perspective:"1200px"
    }}>
      <div style={{
        transform:`rotateX(${-m.y}deg) rotateY(${m.x}deg)`,
        transition:"0.1s"
      }}>
        <h1 style={{fontSize:60,maxWidth:900}}>We build digital products that feel alive</h1>
        <p style={{color:"#aaa",margin:"30px 0"}}>Web • App • Software • AI</p>
        <div style={{background:"#D4AF37",color:"#050c18",padding:"16px 42px",borderRadius:12}}>
          Start Your Project
        </div>
      </div>
    </div>
  );
}
