"use client";
import { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";
import TemplatePreview from "./TemplatePreview";
import { getTemplates } from "@/lib/templateStore";

const systemTemplates = [
  { title:"Restaurant Website", type:"Website", img:"/templates/food.png" },
  { title:"Business Website", type:"Website", img:"/templates/business.png" },
  { title:"Shop Website", type:"Shop", img:"/templates/shop.png" }
];

export default function Templates() {
  const [selected,setSelected]=useState<any>(null);
  const [templates,setTemplates]=useState<any[]>([]);

  useEffect(()=>{
    const admin = getTemplates();
    setTemplates([...systemTemplates, ...admin]);
  },[]);

  return (
    <>
      <div style={grid}>
        {templates.map(t=>(
          <TemplateCard 
            key={t.title}
            {...t}
            onClick={()=>setSelected(t)}
          />
        ))}
      </div>

      <TemplatePreview
        template={selected}
        close={()=>setSelected(null)}
      />
    </>
  );
}

const grid={
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
  gap:40
};
