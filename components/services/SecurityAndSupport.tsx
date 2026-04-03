export default function SecuritySupport() {
  return (
    <section style={section}>
      <div style={container}>
        {/* LEFT CONTENT */}
        <div>
          <h2 style={title}>
            Security, Monitoring & Technical Support
          </h2>

          <p style={desc}>
            Security and reliability are at the core of our infrastructure.
            Prelhe ensures that your websites, servers and data remain protected
            through proactive monitoring, strong security practices and
            continuous technical support.
          </p>

          <p style={desc}>
            We don’t just react to problems — we actively prevent downtime,
            security threats and performance issues.
          </p>

          {/* SECURITY POINTS */}
          <ul style={list}>
            <li>✔ SSL certificates & HTTPS security</li>
            <li>✔ Firewall & DDoS attack protection</li>
            <li>✔ Secure server configurations</li>
            <li>✔ Regular security updates & patches</li>
            <li>✔ Automated backups & recovery</li>
          </ul>
        </div>

        {/* RIGHT SECURITY PANEL */}
        <div style={panel}>
          <h3 style={panelTitle}>How We Protect & Support You</h3>

          <div style={items}>
            <Item
              title="24/7 Monitoring"
              text="Continuous monitoring of servers, uptime, performance and security events."
            />
            <Item
              title="Proactive Issue Prevention"
              text="Potential issues are identified and resolved before they affect your business."
            />
            <Item
              title="Disaster Recovery"
              text="Reliable backup and recovery strategies to protect your data at all times."
            />
            <Item
              title="Dedicated Technical Support"
              text="Our team assists with issues, upgrades, scaling and long-term maintenance."
            />
          </div>

          {/* TRUST METRICS */}
          <div style={metrics}>
            <Metric value="24/7" label="Support" />
            <Metric value="99.9%" label="Uptime Focus" />
            <Metric value="Secure" label="Infrastructure" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= SUB COMPONENTS ================= */

function Item({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div style={item}>
      <h4 style={itemTitle}>{title}</h4>
      <p style={itemText}>{text}</p>
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
  background: "#0F172A",
  padding: "120px 20px",
  color: "#FFFFFF",
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1.1fr 0.9fr",
  gap: "48px",
  alignItems: "flex-start",
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
  color: "#CBD5E1",
};

const list = {
  marginTop: "22px",
  lineHeight: "1.9",
  color: "#E2E8F0",
};

const panel = {
  background: "rgba(255,255,255,0.06)",
  borderRadius: "20px",
  padding: "28px",
  border: "1px solid rgba(255,255,255,0.15)",
};

const panelTitle = {
  fontSize: "22px",
  fontWeight: 800,
  marginBottom: "18px",
};

const items = {
  display: "grid",
  gap: "16px",
};

const item = {
  background: "rgba(255,255,255,0.08)",
  borderRadius: "14px",
  padding: "16px",
};

const itemTitle = {
  fontSize: "16px",
  fontWeight: 700,
};

const itemText = {
  marginTop: "6px",
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#E2E8F0",
};

const metrics = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "14px",
  marginTop: "24px",
};

const metric = {
  background: "rgba(255,255,255,0.12)",
  borderRadius: "14px",
  padding: "12px",
  textAlign: "center" as const,
};

const metricValue = {
  fontSize: "18px",
  fontWeight: 900,
  color: "#38BDF8",
};

const metricLabel = {
  fontSize: "13px",
  color: "#E2E8F0",
};
