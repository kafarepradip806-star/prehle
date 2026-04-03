"use client";

export default function Footer() {
  return (
    <footer style={wrap}>
      <div style={grid}>
        
        {/* Brand */}
        <div>
          <h2 style={logo}>PRELHE</h2>
          <p style={tag}>
            AI Powered Digital Product Factory.  
            Build websites, apps & software using AI + Experts.
          </p>
        </div>

        {/* Company */}
        <div>
          <h4>Company</h4>
          <p>About</p>
          <p>Careers</p>
          <p>Contact</p>
          <p>Security</p>
        </div>

        {/* Services */}
        <div>
          <h4>Services</h4>
          <p>Website Development</p>
          <p>Mobile Apps</p>
          <p>AI Systems</p>
          <p>E-commerce</p>
          <p>Custom Software</p>
        </div>

        {/* Legal */}
        <div>
          <h4>Legal</h4>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>Refund Policy</p>
          <p>Cookie Policy</p>
        </div>

        {/* Connect */}
        <div>
          <h4>Connect</h4>
          <div style={icons}>
            <span>📞 WhatsApp</span>
            <span>✈️ Telegram</span>
            <span>📧 Email</span>
            <span>💬 Chat</span>
            <span>📱 Phone</span>
          </div>
        </div>

      </div>

      <div style={bottom}>
        © {new Date().getFullYear()} PRELHE Technologies. All Rights Reserved.
      </div>
    </footer>
  );
}

/* ================= STYLES ================= */

const wrap = {
  background: "linear-gradient(180deg,#020712,#000)",
  padding: "80px 60px 30px",
  color: "#aaa",
  borderTop: "1px solid rgba(255,255,255,.05)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: 40,
  marginBottom: 50,
};

const logo = {
  color: "#D4AF37",
  fontSize: 32,
  fontWeight: 900,
};

const tag = {
  marginTop: 10,
  lineHeight: 1.6,
};

const icons = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  marginTop: 10,
};

const bottom = {
  textAlign: "center",
  paddingTop: 30,
  borderTop: "1px solid rgba(255,255,255,.05)",
  color: "#666",
  fontSize: 14,
};
