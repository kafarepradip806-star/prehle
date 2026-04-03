import Link from "next/link";

export default function AdvancedCloudUpgrade() {
  return (
    <section style={section}>
      <h2 style={title}>Advanced Cloud (Above 8 GB RAM)</h2>

      <p style={text}>
        When your application requires more than 8 GB RAM or higher performance,
        an advanced cloud upgrade is required.
      </p>

      <ul style={list}>
        <li>✔ Dedicated CPU & RAM</li>
        <li>✔ High availability architecture</li>
        <li>✔ Advanced security & firewall</li>
        <li>✔ Custom monitoring & scaling</li>
        <li>✔ Priority technical support</li>
      </ul>

      <Link href="/contact" style={btn}>
        Request Custom Cloud
      </Link>
    </section>
  );
}

const section = {
  padding: "100px 20px",
  background: "#0F172A",
  color: "#FFFFFF",
  textAlign: "center" as const,
};

const title = { fontSize: "36px", fontWeight: 900 };
const text = {
  marginTop: "14px",
  maxWidth: "700px",
  marginInline: "auto",
  color: "#CBD5E1",
};

const list = {
  marginTop: "24px",
  lineHeight: "1.9",
  color: "#E2E8F0",
};

const btn = {
  marginTop: "28px",
  display: "inline-block",
  background: "#38BDF8",
  color: "#0F172A",
  padding: "14px 32px",
  borderRadius: "14px",
  fontWeight: 900,
  textDecoration: "none",
};
