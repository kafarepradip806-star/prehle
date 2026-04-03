export default function ServicesProcess() {
  return (
    <section style={section}>
      <div style={container}>
        {/* HEADER */}
        <div style={header}>
          <h2 style={title}>Our Professional Working Process</h2>
          <p style={subtitle}>
            A structured, transparent and enterprise-ready process that ensures
            reliability, security and long-term success.
          </p>
        </div>

        {/* PROCESS STEPS */}
        <div style={stepsGrid}>
          <Step
            number="01"
            title="Requirement & Consultation"
            text="We understand your business goals, technical needs and future scalability requirements."
          />
          <Step
            number="02"
            title="Planning & Architecture"
            text="We design a secure, scalable and performance-optimized architecture before implementation."
          />
          <Step
            number="03"
            title="Setup & Implementation"
            text="Domain, hosting, cloud servers and security are set up following best practices."
          />
          <Step
            number="04"
            title="Testing & Optimization"
            text="We test performance, security and reliability to ensure everything works perfectly."
          />
          <Step
            number="05"
            title="Launch & Deployment"
            text="Your website or application is launched with monitoring and backup systems in place."
          />
          <Step
            number="06"
            title="Monitoring & Support"
            text="Continuous monitoring, updates, scaling and long-term technical support."
          />
        </div>
      </div>
    </section>
  );
}

/* ================= SUB COMPONENT ================= */

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div style={stepCard}>
      <div style={stepNumber}>{number}</div>
      <h3 style={stepTitle}>{title}</h3>
      <p style={stepText}>{text}</p>
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

const stepsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "28px",
};

const stepCard = {
  background: "#FFFFFF",
  borderRadius: "20px",
  padding: "28px",
  border: "1px solid #E2E8F0",
};

const stepNumber = {
  fontSize: "22px",
  fontWeight: 900,
  color: "#2563EB",
};

const stepTitle = {
  marginTop: "10px",
  fontSize: "18px",
  fontWeight: 800,
  color: "#0F172A",
};

const stepText = {
  marginTop: "8px",
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#475569",
};
