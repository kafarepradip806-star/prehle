export default function ServicesOverview() {
  return (
    <section style={section}>
      <h2 style={heading}>Complete Online Infrastructure</h2>
      <p style={para}>
        Prelhe provides complete A to Z services including domain registration,
        hosting, cloud servers, security, monitoring and long-term support.
        We manage the technology so you can focus on your business.
      </p>
    </section>
  );
}

const section = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "80px 20px",
};

const heading = { fontSize: "32px", fontWeight: 800 };
const para = { marginTop: "12px", color: "#475569", lineHeight: "1.7" };
