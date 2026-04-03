import Link from "next/link";

export default function ServicesHero() {
  return (
    <section style={hero}>
      {/* BACKGROUND OVERLAY */}
      <div style={overlay} />

      <div style={container}>
        {/* LEFT CONTENT */}
        <div style={left}>
          <h1 style={title}>
            A to Z Hosting, Cloud & Domain Services
          </h1>

          <p style={subtitle}>
            Our own managed cloud infrastructure, reliable hosting solutions
            and free domain services — everything your business needs to go online
            and scale securely.
          </p>

          {/* HIGHLIGHTS */}
          <ul style={highlights}>
            <li>✔ Free Domain with Hosting</li>
            <li>✔ Managed Cloud Infrastructure</li>
            <li>✔ 99.9% Uptime Guarantee</li>
            <li>✔ Security & Technical Support</li>
          </ul>

          {/* CTA */}
          <div style={ctaRow}>
            <Link href="/contact" style={primaryBtn}>
              Get Started
            </Link>
            <Link href="/pricing" style={secondaryBtn}>
              View Pricing
            </Link>
          </div>
        </div>

        {/* RIGHT INFO CARD */}
        <div style={right}>
          <div style={infoCard}>
            <h3 style={cardTitle}>Why Prelhe?</h3>

            <div style={stats}>
              <Stat value="99.9%" label="Uptime" />
              <Stat value="24/7" label="Support" />
              <Stat value="Secure" label="Infrastructure" />
            </div>

            <p style={cardText}>
              We don’t just provide hosting — we manage, secure and scale your
              complete online infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= SMALL SUB PART ================= */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={stat}>
      <div style={statValue}>{value}</div>
      <div style={statLabel}>{label}</div>
    </div>
  );
}

/* ================= STYLES ================= */

const hero = {
  position: "relative" as const,
  background: "linear-gradient(135deg,#0F172A,#1E40AF)",
  color: "#FFFFFF",
  padding: "120px 20px",
  overflow: "hidden",
};

const overlay = {
  position: "absolute" as const,
  inset: 0,
  background:
    "radial-gradient(circle at top right, rgba(37,99,235,0.35), transparent 60%)",
};

const container = {
  position: "relative" as const,
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1.2fr 0.8fr",
  gap: "40px",
  alignItems: "center",
};

const left = {};

const title = {
  fontSize: "52px",
  fontWeight: 900,
  lineHeight: "1.1",
};

const subtitle = {
  marginTop: "18px",
  fontSize: "18px",
  lineHeight: "1.7",
  color: "#DBEAFE",
};

const highlights = {
  marginTop: "22px",
  lineHeight: "1.9",
  color: "#E0E7FF",
};

const ctaRow = {
  marginTop: "32px",
  display: "flex",
  gap: "16px",
  flexWrap: "wrap" as const,
};

const primaryBtn = {
  background: "#2563EB",
  color: "#FFFFFF",
  padding: "14px 34px",
  borderRadius: "12px",
  fontWeight: 800,
  textDecoration: "none",
};

const secondaryBtn = {
  border: "1px solid rgba(255,255,255,0.4)",
  color: "#FFFFFF",
  padding: "14px 34px",
  borderRadius: "12px",
  fontWeight: 700,
  textDecoration: "none",
};

const right = {};

const infoCard = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(10px)",
  borderRadius: "18px",
  padding: "28px",
  border: "1px solid rgba(255,255,255,0.15)",
};

const cardTitle = {
  fontSize: "22px",
  fontWeight: 800,
};

const stats = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "16px",
  marginTop: "18px",
};

const stat = {
  background: "rgba(255,255,255,0.12)",
  borderRadius: "12px",
  padding: "12px",
  textAlign: "center" as const,
};

const statValue = {
  fontSize: "18px",
  fontWeight: 800,
};

const statLabel = {
  fontSize: "13px",
  color: "#DBEAFE",
};

const cardText = {
  marginTop: "18px",
  fontSize: "14px",
  color: "#E0E7FF",
  lineHeight: "1.6",
};
