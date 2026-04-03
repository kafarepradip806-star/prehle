export default function CTA() {
  return (
    <section style={sec}>
      <h2>Start Your Project Today</h2>
      <p>Let AI + Experts build your product</p>
      <button style={btn}>Login & Start</button>
    </section>
  );
}

const sec = {
  padding: 100,
  background: "linear-gradient(135deg,#0f2a44,#050c18)",
  textAlign: "center",
  color: "white",
};

const btn = {
  marginTop: 30,
  padding: "16px 50px",
  background: "#D4AF37",
  border: "none",
  borderRadius: 30,
  fontSize: 18,
  cursor: "pointer",
};
