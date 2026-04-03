const services = ["Website", "Mobile App", "Software", "Ecommerce", "AI Solutions"];

export default function Services() {
  return (
    <section style={sec}>
      <h2>Our Services</h2>
      <div style={grid}>
        {services.map(s => (
          <div key={s} style={card}>{s}</div>
        ))}
      </div>
    </section>
  );
}

const sec = { padding: 80, background: "#050c18", color: "white" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20, marginTop: 40 };
const card = { background: "#0f2a44", padding: 30, borderRadius: 20, textAlign: "center" };
