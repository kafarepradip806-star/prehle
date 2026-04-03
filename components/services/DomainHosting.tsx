export default function DomainHosting() {
  return (
    <section style={section}>
      <div style={container}>
        {/* LEFT CONTENT */}
        <div>
          <h2 style={title}>
            Domain & Web Hosting Services
          </h2>

          <p style={desc}>
            We provide complete domain and hosting solutions designed for
            reliability, performance and long-term stability. From free domain
            registration to fully managed hosting, Prelhe takes care of
            everything.
          </p>

          <ul style={list}>
            <li>✔ Free domain with selected hosting plans</li>
            <li>✔ Domain registration, renewal & DNS management</li>
            <li>✔ Business & enterprise-grade web hosting</li>
            <li>✔ High-speed SSD storage</li>
            <li>✔ Professional email hosting included</li>
            <li>✔ Daily backups & uptime monitoring</li>
          </ul>
        </div>

        {/* RIGHT INFO CARD */}
        <div style={card}>
          <h3 style={cardTitle}>Hosting Highlights</h3>

          <div style={highlights}>
            <Highlight
              title="Free Domain"
              text="Get a free domain with our hosting plans to start your online presence instantly."
            />
            <Highlight
              title="High Performance"
              text="Optimized servers with SSD storage for fast loading websites."
            />
            <Highlight
              title="Reliable Uptime"
              text="99.9% uptime with continuous monitoring and backups."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= SUB COMPONENT ================= */

function Highlight({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div style={highlight}>
      <h4 style={highlightTitle}>{title}</h4>
      <p style={highlightText}>{text}</p>
    </div>
  );
}

/* ================= STYLES ================= */

const section = {
  background: "#FFFFFF",
  padding: "100px 20px",
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1.1fr 0.9fr",
  gap: "40px",
  alignItems: "center",
};

const title = {
  fontSize: "36px",
  fontWeight: 900,
  color: "#0F172A",
};

const desc = {
  marginTop: "16px",
  fontSize: "16px",
  lineHeight: "1.7",
  color: "#475569",
};

const list = {
  marginTop: "20px",
  lineHeight: "1.9",
  color: "#334155",
};

const card = {
  background: "#F8FAFC",
  borderRadius: "18px",
  padding: "28px",
  border: "1px solid #E2E8F0",
};

const cardTitle = {
  fontSize: "22px",
  fontWeight: 800,
  marginBottom: "16px",
};

const highlights = {
  display: "grid",
  gap: "16px",
};

const highlight = {
  background: "#FFFFFF",
  borderRadius: "14px",
  padding: "16px",
  border: "1px solid #E5E7EB",
};

const highlightTitle = {
  fontSize: "16px",
  fontWeight: 700,
  color: "#0F172A",
};

const highlightText = {
  marginTop: "6px",
  fontSize: "14px",
  color: "#475569",
  lineHeight: "1.6",
};
