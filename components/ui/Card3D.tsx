"use client";
import { useState } from "react";

export default function Card3D({ children }: { children: React.ReactNode }) {
  const [style,setStyle]=useState({});

  const move = (e:any)=>{
    const r=e.currentTarget.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width;
    const y=(e.clientY-r.top)/r.height;

    const rx=(0.5-y)*20;
    const ry=(x-0.5)*20;

    setStyle({transform:`rotateX(${rx}deg) rotateY(${ry}deg) scale(1.05)`});
  };

  return (
    <div
      onMouseMove={move}
      onMouseLeave={()=>setStyle({transform:"rotateX(0) rotateY(0) scale(1)"})}
      style={{...card3d,...style}}
    >
      <div style={glow}/>
      <div style={content}>{children}</div>
    </div>
  );
}

const card3d={
  position:"relative",
  background:"linear-gradient(135deg,#0f2a44,#020712)",
  borderRadius:30,
  padding:50,
  color:"white",
  boxShadow:"0 50px 120px rgba(0,0,0,.9)",
  transformStyle:"preserve-3d",
  transition:".15s",
};

const glow={
  position:"absolute",
  inset:-1,
  borderRadius:30,
  background:"linear-gradient(90deg,#3b82f6,#D4AF37)",
  opacity:.3
};

const content={
  position:"relative",
  transform:"translateZ(40px)"
};
