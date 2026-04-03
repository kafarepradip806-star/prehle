export default function ComparePlans() {
  return (
    <section style={section}>
      <h2 style={heading}>Why Choose Prelhe</h2>
      <ul style={list}>
        <li>✔ Free domain with hosting plans</li>
        <li>✔ Our own managed infrastructure</li>
        <li>✔ Transparent pricing</li>
        <li>✔ Local support & long-term partnership</li>
      </ul>
    </section>
  );
}

const section = { maxWidth: "1100px", margin: "0 auto", padding: "70px 20px" };
const heading = { fontSize: "30px", fontWeight: 800 };
const list = { marginTop: "14px", color: "#475569", lineHeight: "1.9" };
