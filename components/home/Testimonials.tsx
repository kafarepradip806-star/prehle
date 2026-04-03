import HoverCard from "./HoverCard";

export default function Services(){
  return (
    <div style={{
      padding:"140px 80px",
      display:"grid",
      gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
      gap:60
    }}>
      {[
        "Web Platforms",
        "Mobile Applications",
        "Enterprise Software",
        "AI Automation"
      ].map(s=>(
        <HoverCard key={s}>
          <h3>{s}</h3>
          <p style={{color:"#aaa",marginTop:12}}>
            Premium-grade digital systems built for speed, security and scale.
          </p>
        </HoverCard>
      ))}
    </div>
  );
}
