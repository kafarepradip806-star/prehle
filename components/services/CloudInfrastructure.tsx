export default function CloudInfrastructure() {
  return (
    <section style={section}>
      <div style={container}>
        {/* LEFT – INFO CARD */}
        <div style={card}>
          <h3 style={cardTitle}>Our Cloud Capabilities</h3>

          <div style={points}>
            <Point
              title="Managed Cloud Servers"
              text="Fully managed cloud servers hosted on our own infrastructure for maximum control, stability and security."
            />
            <Point
              title="Scalable Resources"
              text="Easily scale CPU, RAM and storage as your traffic and business grow without downtime."
            />
            <Point
              title="High Availability"
              text="Designed for 99.9% uptime with redundancy, monitoring and failover strategies."
            />
            <Point
              title="Performance Optimization"
              text="Optimized server configurations for fast, reliable and consistent performance."
            />
          </div>
        </div>

        {/* RIGHT – MAIN CONTENT */}
        <div>
          <h2 style={title}>Cloud & Server Infrastructure</h2>

          <p style={desc}>
            Our cloud infrastructure is built for modern websites, applications
            and enterprise systems. Whether you need virtual servers, dedicated
            resources or a fully managed cloud environment, Prelhe delivers
            secure and scalable solutions.
          </p>

          <p style={desc}>
            We take care of setup, monitoring, security and optimization so you
            can focus on growing your business without worrying about technical
            complexity.
          </p>

          <ul style={list}>
            <li>✔ Virtual & dedicated cloud servers</li>
            <li>✔ Flexible CPU, RAM & storage scaling</li>
            <li>✔ Secure data centers & network</li>
            <li>✔ Continuous monitoring & alerts</li>
            <li>✔ Backup, recovery & disaster planning</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ================= SUB COMPONENT ================= */

function Point({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div style={point}>
      <h4 style={pointTitle}>{title}</h4>
      <p style={pointText}>{text}</p>
    </div>
  );
}

/* ================= STYLES ================= */

const section = {
  background: "#F8FAFC",
  padding: "120px 20px",
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "0.9fr 1.1fr",
  gap: "48px",
  alignItems: "center",
};

const title = {
  fontSize: "38px",
  fontWeight: 900,
  color: "#0F172A",
  lineHeight: "1.2",
};

const desc = {
  marginTop: "18px",
  fontSize: "16px",
  lineHeight: "1.7",
  color: "#475569",
};

const list = {
  marginTop: "22px",
  lineHeight: "1.9",
  color: "#334155",
};

const card = {
  background: "#FFFFFF",
  borderRadius: "20px",
  padding: "28px",
  border: "1px solid #E2E8F0",
};

const cardTitle = {
  fontSize: "22px",
  fontWeight: 800,
  marginBottom: "18px",
};

const points = {
  display: "grid",
  gap: "16px",
};

const point = {
  background: "#F8FAFC",
  borderRadius: "14px",
  padding: "16px",
  border: "1px solid #E5E7EB",
};

const pointTitle = {
  fontSize: "16px",
  fontWeight: 700,
  color: "#0F172A",
};

const pointText = {
  marginTop: "6px",
  fontSize: "14px",
  color: "#475569",
  lineHeight: "1.6",
};
