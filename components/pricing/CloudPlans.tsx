export default function CloudPlans() {
  return (
    <section style={{ ...section, background: "#F8FAFC" }}>
      <h2 style={heading}>Cloud & Server Plans</h2>

      <div style={grid}>
        <Plan name="Cloud Basic" price="₹1999 / month" specs="2 vCPU • 4 GB RAM • 50 GB SSD" />
        <Plan name="Cloud Pro" price="₹4999 / month" specs="4 vCPU • 8 GB RAM • 100 GB SSD" />
        <Plan name="Dedicated" price="Custom" specs="Dedicated resources • Full control" />
      </div>
    </section>
  );
}

function Plan({ name, price, specs }: any) {
  return (
    <div style={card}>
      <h3 style={planName}>{name}</h3>
      <p style={priceStyle}>{price}</p>
      <p style={{ color: "#475569", marginTop: "6px" }}>{specs}</p>
    </div>
  );
}

const section = { maxWidth: "1100px", margin: "0 auto", padding: "80px 20px" };
const heading = { fontSize: "32px", fontWeight: 800 };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "24px", marginTop: "30px" };
const card = { border: "1px solid #E5E7EB", borderRadius: "14px", padding: "26px" };
const planName = { fontSize: "22px", fontWeight: 700 };
const priceStyle = { marginTop: "8px", fontSize: "20px", fontWeight: 700, color: "#2563EB" };
