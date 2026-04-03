import Link from "next/link";

export default function ServicesCTA() {
  return (
    <section style={section}>
      <div style={container}>
        {/* LEFT CONTENT */}
        <div>
          <h2 style={title}>
            Ready to Launch Your Website or Cloud Infrastructure?
          </h2>

          <p style={desc}>
            Whether you need a domain, hosting, cloud servers or complete
            infrastructure management — our team is ready to help you build
            a secure and scalable online presence.
          </p>

          {/* TRUST POINTS */}
          <ul style={points}>
            <li>✔ Free domain with hosting plans</li>
            <li>✔ Managed cloud & server infrastructure</li>
            <li>✔ Security, monitoring & technical support</li>
            <li>✔ Transparent pricing & long-term partnership</li>
          </ul>

          {/* CTA BUTTONS */}
          <div style={buttons}>
            <Link href="/contact" style={primaryBtn}>
              Talk to Our Expert
            </Link>

            <Link href="/pricing" style={secondaryBtn}>
              View Pricing
            </Link>
          </div>
        </div>

        {/* RIGHT TRUST CARD */}
        <div style={trustCard}>
          <h3 style={trustTitle}>Why Businesses Choose Prelhe</h3>

          <div style={stats}>
            <Stat value="99.9%" label="Uptime Focus" />
            <Stat value="24/7" label="Monitoring" />
            <Stat value="End-to-End" label="Service" />
          </div>

          <p style={trustText}>
            We don’t just sell hosting or cloud services — we manage,
            secure and scale your complete digital infrastructure so you
            can focus on growing your business.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================= SUB COMPONENT ================= */

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div style={stat}>
      <div style={statValue}>{value}</div>
      <div style={statLabel}>{label}</div>
    </div>
  );
}

/* ================= STYLES ================= */

const section = {
  background: "linear-gradient(135deg,#1E40AF,#0F172A)",
  padding: "120px 20px",
  color: "#FFFFFF",
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1.2fr 0.8fr",
  gap: "48px",
  alignItems: "center",
};

const title = {
  fontSize: "38px",
  fontWeight: 900,
  lineHeight: "1.2",
};

const desc = {
  marginTop: "18px",
  fontSize: "16px",
  lineHeight: "1.7",
  color: "#E0E7FF",
};

const points = {
  marginTop: "22px",
  lineHeight: "1.9",
  color: "#DBEAFE",
};

const buttons = {
  marginTop: "34px",
  display: "flex",
  gap: "16px",
  flexWrap: "wrap" as const,
};

const primaryBtn = {
  background: "#FFFFFF",
  color: "#1E40AF",
  padding: "14px 36px",
  borderRadius: "14px",
  fontWeight: 900,
  textDecoration: "none",
};

const secondaryBtn = {
  border: "1px solid rgba(255,255,255,0.5)",
  color: "#FFFFFF",
  padding: "14px 36px",
  borderRadius: "14px",
  fontWeight: 700,
  textDecoration: "none",
};

const trustCard = {
  background: "rgba(255,255,255,0.08)",
  borderRadius: "22px",
  padding: "32px",
  border: "1px solid rgba(255,255,255,0.18)",
};

const trustTitle = {
  fontSize: "22px",
  fontWeight: 800,
};

const stats = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "14px",
  marginTop: "18px",
};

const stat = {
  background: "rgba(255,255,255,0.12)",
  borderRadius: "14px",
  padding: "14px",
  textAlign: "center" as const,
};

const statValue = {
  fontSize: "18px",
  fontWeight: 900,
  color: "#38BDF8",
};

const statLabel = {
  fontSize: "13px",
  color: "#E0E7FF",
};

const trustText = {
  marginTop: "18px",
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#E0E7FF",
};
