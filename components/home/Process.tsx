const steps = ["Tell Idea", "AI Designs", "Payment", "Development", "Delivery"];

export default function Process() {
  return (
    <section style={sec}>
      <h2>How it Works</h2>
      <div style={grid}>
        {steps.map(s => (
          <div key={s} style={step}>{s}</div>
        ))}
      </div>
    </section>
  );
}

const sec = { padding: 80, background: "#0a1931", color: "white" };
const grid = { display: "flex", justifyContent: "space-between", flexWrap: "wrap", marginTop: 40 };
const step = { background: "#0f2a44", padding: 20, borderRadius: 16, minWidth: 160, textAlign: "center" };
