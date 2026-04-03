export default function HostingServices() {
  return (
    <section style={section}>
      <h2 style={heading}>Domain & Web Hosting Services</h2>

      <ul style={list}>
        <li>✔ Free domain with selected hosting plans</li>
        <li>✔ Domain registration, renewal & DNS management</li>
        <li>✔ Business & enterprise web hosting</li>
        <li>✔ SSD storage for high performance</li>
        <li>✔ Email hosting included</li>
        <li>✔ Daily backups & uptime monitoring</li>
      </ul>
    </section>
  );
}

const section = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "80px 20px",
};

const heading = { fontSize: "30px", fontWeight: 800 };
const list = { marginTop: "14px", color: "#475569", lineHeight: "1.9" };
