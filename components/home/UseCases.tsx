import Card3D from "@/components/ui/Card3D";

export default function UseCases() {
  const cases = [
    { t: "Restaurant Website", d: "Online menu, booking & orders" },
    { t: "Local Business", d: "Google-ready business websites" },
    { t: "E-Commerce Store", d: "Sell products online with payment" },
    { t: "Startup App", d: "MVP mobile & web app" },
  ];

  return (
    <div style={grid}>
      {cases.map((c,i)=>(
        <Card3D key={i}>
          <h3>{c.t}</h3>
          <p>{c.d}</p>
        </Card3D>
      ))}
    </div>
  );
}

const grid = {
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
  gap:40
};
