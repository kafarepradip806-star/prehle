const features = ["AI Powered", "Live Preview", "Secure Payment", "Fast Delivery", "Scalable"];

export default function Features() {
  return (
    <section style={sec}>
      <h2>Why PRELHE?</h2>
      <div style={grid}>
        {features.map(f => (
          <div key={f} style={box}>{f}</div>
        ))}
      </div>
    </section>
  );
}

const sec = { padding: 80, background: "#050c18", color: "white" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20, marginTop: 40 };
const box = { background: "#0f2a44", padding: 30, borderRadius: 20, textAlign: "center" };
