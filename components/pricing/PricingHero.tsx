export default function PricingHero() {
  return (
    <section style={hero}>
      <h1 style={title}>Simple & Unified Pricing</h1>
      <p style={subtitle}>
        Hosting & Cloud plans with transparent pricing — no confusion, no hidden charges.
      </p>
    </section>
  );
}

const hero = {
  background: "linear-gradient(135deg,#1E40AF,#0F172A)",
  padding: "120px 20px",
  textAlign: "center" as const,
  color: "#FFFFFF",
};

const title = { fontSize: "46px", fontWeight: 900 };
const subtitle = {
  marginTop: "14px",
  fontSize: "16px",
  color: "#DBEAFE",
  maxWidth: "720px",
  marginInline: "auto",
};
