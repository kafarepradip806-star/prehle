import Link from "next/link";

export default function PricingCTA() {
  return (
    <section style={cta}>
      <h2 style={title}>Need Custom Pricing?</h2>
      <p style={text}>
        Talk to our experts for a custom hosting or cloud solution.
      </p>
      <Link href="/contact" style={btn}>
        Contact Us
      </Link>
    </section>
  );
}

const cta = {
  background: "#1E40AF",
  padding: "100px 20px",
  textAlign: "center" as const,
  color: "#FFFFFF",
};

const title = { fontSize: "36px", fontWeight: 900 };
const text = { marginTop: "12px", color: "#DBEAFE" };

const btn = {
  marginTop: "22px",
  display: "inline-block",
  background: "#FFFFFF",
  color: "#1E40AF",
  padding: "14px 34px",
  borderRadius: "14px",
  fontWeight: 900,
  textDecoration: "none",
};
