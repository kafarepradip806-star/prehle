import Link from "next/link";

export default function UnifiedHostingCloudPlans() {
  return (
    <section style={section}>
      <div style={header}>
        <h2 style={title}>Hosting & Cloud Pricing (Up to 8 GB RAM)</h2>
        <p style={subtitle}>
          Flat pricing model: <strong>₹6 per GB storage</strong>.  
          Hosting and Cloud are the same up to 8 GB RAM.
        </p>
      </div>

      <div style={grid}>
        <Plan storage="10 GB" price="₹60 / month" />
        <Plan storage="25 GB" price="₹150 / month" popular />
        <Plan storage="50 GB" price="₹300 / month" />
        <Plan storage="Custom" price="₹6 per GB" />
      </div>

      <div style={includedBox}>
        <h4>Included in All Plans</h4>
        <ul>
          <li>✔ Up to 8 GB RAM included</li>
          <li>✔ Basic CPU allocation</li>
          <li>✔ SSD Storage</li>
          <li>✔ Free SSL Certificate</li>
          <li>✔ Email Hosting</li>
          <li>✔ Monitoring & Backups</li>
        </ul>
      </div>

      <div style={fup}>
        *CPU, RAM and network usage are subject to fair usage policy.
      </div>
    </section>
  );
}

function Plan({
  storage,
  price,
  popular,
}: {
  storage: string;
  price: string;
  popular?: boolean;
}) {
  return (
    <div
      style={{
        ...card,
        borderColor: popular ? "#2563EB" : "#E5E7EB",
        transform: popular ? "scale(1.05)" : "none",
      }}
    >
      {popular && <div style={badge}>Most Popular</div>}
      <h3 style={planTitle}>{storage} Storage</h3>
      <p style={priceText}>{price}</p>

      <Link href="/contact" style={btn}>
        Get Started
      </Link>
    </div>
  );
}

/* styles */
const section = { padding: "100px 20px" };
const header = { textAlign: "center" as const, marginBottom: "60px" };
const title = { fontSize: "36px", fontWeight: 900 };
const subtitle = { marginTop: "12px", color: "#475569" };

const grid = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
  gap: "28px",
};

const card = {
  border: "2px solid #E5E7EB",
  borderRadius: "22px",
  padding: "28px",
  position: "relative" as const,
  textAlign: "center" as const,
};

const badge = {
  position: "absolute" as const,
  top: "-14px",
  left: "20px",
  background: "#2563EB",
  color: "#FFF",
  padding: "6px 14px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 800,
};

const planTitle = { fontSize: "20px", fontWeight: 800 };
const priceText = { fontSize: "22px", fontWeight: 900, color: "#2563EB" };

const btn = {
  marginTop: "22px",
  display: "inline-block",
  background: "#2563EB",
  color: "#FFF",
  padding: "12px 28px",
  borderRadius: "12px",
  fontWeight: 800,
  textDecoration: "none",
};

const includedBox = {
  maxWidth: "900px",
  margin: "60px auto 0",
  background: "#F8FAFC",
  padding: "24px",
  borderRadius: "16px",
  border: "1px solid #E2E8F0",
};

const fup = {
  marginTop: "18px",
  textAlign: "center" as const,
  fontSize: "13px",
  color: "#64748B",
};
