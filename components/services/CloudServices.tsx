export default function CloudService() {
  return (
    <section style={section}>
      <div style={container}>
        {/* HEADER */}
        <div style={header}>
          <h2 style={title}>Cloud Services</h2>
          <p style={subtitle}>
            Powerful, secure and scalable cloud solutions built on our own
            managed infrastructure to support businesses of all sizes.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div style={grid}>
          <ServiceCard
            title="Managed Cloud Servers"
            text="Fully managed virtual cloud servers with high availability, security and performance."
            points={[
              "Virtual private servers (VPS)",
              "Full server management",
              "Root / admin access",
            ]}
          />

          <ServiceCard
            title="Dedicated Cloud Resources"
            text="Dedicated CPU, RAM and storage for performance-critical applications."
            points={[
              "Dedicated resources",
              "No resource sharing",
              "High performance workloads",
            ]}
          />

          <ServiceCard
            title="Scalable Cloud Hosting"
            text="Scale your infrastructure instantly as traffic and business requirements grow."
            points={[
              "On-demand scaling",
              "No downtime upgrades",
              "Pay for what you use",
            ]}
          />

          <ServiceCard
            title="Backup & Disaster Recovery"
            text="Protect your data with automated backups and disaster recovery solutions."
            points={[
              "Daily automated backups",
              "Fast recovery options",
              "Secure data storage",
            ]}
          />
        </div>

        {/* FOOTER NOTE */}
        <div style={noteBox}>
          <p style={noteText}>
            Our cloud services are ideal for websites, SaaS platforms,
            enterprise applications and mission-critical systems.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================= SUB COMPONENT ================= */

function ServiceCard({
  title,
  text,
  points,
}: {
  title: string;
  text: string;
  points: string[];
}) {
  return (
    <div style={card}>
      <h3 style={cardTitle}>{title}</h3>
      <p style={cardText}>{text}</p>

      <ul style={list}>
        {points.map((p) => (
          <li key={p}>✔ {p}</li>
        ))}
      </ul>
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
};

const header = {
  maxWidth: "700px",
  marginBottom: "60px",
};

const title = {
  fontSize: "38px",
  fontWeight: 900,
  color: "#0F172A",
};

const subtitle = {
  marginTop: "16px",
  fontSize: "16px",
  lineHeight: "1.7",
  color: "#475569",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "28px",
};

const card = {
  background: "#F8FAFC",
  borderRadius: "20px",
  padding: "28px",
  border: "1px solid #E2E8F0",
};

const cardTitle = {
  fontSize: "20px",
  fontWeight: 800,
  color: "#0F172A",
};

const cardText = {
  marginTop: "10px",
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#475569",
};

const list = {
  marginTop: "14px",
  lineHeight: "1.8",
  color: "#334155",
};

const noteBox = {
  marginTop: "60px",
  background: "#F1F5F9",
  padding: "24px",
  borderRadius: "16px",
  border: "1px solid #E2E8F0",
};

const noteText = {
  fontSize: "14px",
  color: "#475569",
  lineHeight: "1.6",
};
