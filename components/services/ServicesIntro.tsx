export default function ServicesIntro() {
  return (
    <section style={section}>
      <div style={container}>
        {/* LEFT MAIN CONTENT */}
        <div>
          <h2 style={title}>
            Complete A to Z Digital Infrastructure Services
          </h2>

          <p style={para}>
            Prelhe is not just a service provider — we are your long-term
            technology partner. From domain registration to enterprise-grade
            cloud infrastructure, we manage your complete online ecosystem
            with reliability, security and scalability at the core.
          </p>

          <p style={para}>
            Our infrastructure and services are designed for startups,
            growing businesses and enterprises that need stable systems,
            predictable performance and professional support.
          </p>

          {/* KEY VALUE POINTS */}
          <div style={values}>
            <Value
              title="End-to-End Ownership"
              text="We handle everything from setup to maintenance, so you don’t need multiple vendors."
            />
            <Value
              title="Enterprise-Grade Reliability"
              text="Our systems are designed for uptime, security and long-term stability."
            />
            <Value
              title="Scalable by Design"
              text="Upgrade hosting, cloud resources or security anytime as your business grows."
            />
          </div>
        </div>

        {/* RIGHT TRUST PANEL */}
        <div style={trustPanel}>
          <h3 style={trustTitle}>What We Manage for You</h3>

          <ul style={trustList}>
            <li>✔ Domain registration & DNS management</li>
            <li>✔ Web hosting & email services</li>
            <li>✔ Cloud servers & infrastructure</li>
            <li>✔ Security, backups & monitoring</li>
            <li>✔ Performance optimization</li>
            <li>✔ Technical support & upgrades</li>
          </ul>

          {/* TRUST METRICS */}
          <div style={metrics}>
            <Metric value="99.9%" label="Uptime Focus" />
            <Metric value="24/7" label="Monitoring" />
            <Metric value="A-Grade" label="Security" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= SUB PARTS ================= */

function Value({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div style={valueBox}>
      <h4 style={valueTitle}>{title}</h4>
      <p style={valueText}>{text}</p>
    </div>
  );
}

function Metric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div style={metric}>
      <div style={metricValue}>{value}</div>
      <div style={metricLabel}>{label}</div>
    </div>
  );
}

/* ================= STYLES ================= */

const section = {
  background: "#FFFFFF",
  padding: "120px 20px",
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1.2fr 0.8fr",
  gap: "48px",
  alignItems: "flex-start",
};

const title = {
  fontSize: "38px",
  fontWeight: 900,
  color: "#0F172A",
  lineHeight: "1.2",
};

const para = {
  marginTop: "18px",
  fontSize: "16px",
  lineHeight: "1.7",
  color: "#475569",
};

const values = {
  marginTop: "32px",
  display: "grid",
  gap: "18px",
};

const valueBox = {
  background: "#F8FAFC",
  borderRadius: "16px",
  padding: "18px",
  border: "1px solid #E2E8F0",
};

const valueTitle = {
  fontSize: "16px",
  fontWeight: 800,
  color: "#0F172A",
};

const valueText = {
  marginTop: "6px",
  fontSize: "14px",
  color: "#475569",
  lineHeight: "1.6",
};

const trustPanel = {
  background: "linear-gradient(180deg,#F8FAFC,#FFFFFF)",
  borderRadius: "20px",
  padding: "28px",
  border: "1px solid #E2E8F0",
};

const trustTitle = {
  fontSize: "22px",
  fontWeight: 800,
  marginBottom: "14px",
};

const trustList = {
  lineHeight: "1.9",
  color: "#334155",
};

const metrics = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "14px",
  marginTop: "24px",
};

const metric = {
  background: "#FFFFFF",
  borderRadius: "14px",
  padding: "12px",
  border: "1px solid #E5E7EB",
  textAlign: "center" as const,
};

const metricValue = {
  fontSize: "18px",
  fontWeight: 900,
  color: "#2563EB",
};

const metricLabel = {
  fontSize: "13px",
  color: "#475569",
};
