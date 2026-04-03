export const metadata = {
  title: "Contact Us | Prelhe IT Solutions",
  description:
    "Get in touch with Prelhe IT Solutions for software, web, automation and IT services.",
};

export default function ContactPage() {
  return (
    <main style={{ backgroundColor: "#FFFFFF", color: "#0F172A" }}>
      {/* HERO */}
      <section
        style={{
          backgroundColor: "#F8FAFC",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "40px", fontWeight: 700 }}>Contact Us</h1>
        <p
          style={{
            marginTop: "16px",
            color: "#475569",
            maxWidth: "700px",
            marginInline: "auto",
            fontSize: "16px",
          }}
        >
          Have a project in mind or need IT support?  
          Talk to our team and let’s find the right solution.
        </p>
      </section>

      {/* CONTACT SECTION */}
      <section
        style={{
          padding: "64px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "40px",
        }}
      >
        {/* CONTACT INFO */}
        <div>
          <h2 style={{ fontSize: "28px", fontWeight: 600 }}>
            Get in Touch
          </h2>

          <p style={{ marginTop: "12px", color: "#475569" }}>
            Our team is available to discuss your requirements and provide
            reliable IT solutions tailored to your business.
          </p>

          <div style={{ marginTop: "32px" }}>
            <p style={{ marginBottom: "12px" }}>
              <strong>Email:</strong> support@prelhe.com
            </p>
            <p style={{ marginBottom: "12px" }}>
              <strong>Phone:</strong> +91 XXXXX XXXXX
            </p>
            <p>
              <strong>Location:</strong> India
            </p>
          </div>

          {/* PLACEHOLDER MAP */}
          <div
            style={{
              marginTop: "32px",
              backgroundColor: "#F1F5F9",
              borderRadius: "16px",
              padding: "24px",
              textAlign: "center",
              color: "#64748B",
            }}
          >
            📍 Map Placeholder  
            <br />
            (Google Map embed later)
          </div>
        </div>

        {/* CONTACT FORM */}
        <div
          style={{
            backgroundColor: "#F1F5F9",
            borderRadius: "20px",
            padding: "32px",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: 600 }}>
            Send Us a Message
          </h2>

          <form style={{ marginTop: "24px" }}>
            <input
              type="text"
              placeholder="Your Name"
              style={inputStyle}
            />

            <input
              type="email"
              placeholder="Your Email"
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Subject"
              style={inputStyle}
            />

            <textarea
              placeholder="Your Message"
              rows={5}
              style={{
                ...inputStyle,
                resize: "none",
              }}
            />

            {/* PLACEHOLDER SUBMIT */}
            <button
              type="button"
              style={{
                marginTop: "16px",
                width: "100%",
                backgroundColor: "#2563EB",
                color: "#FFFFFF",
                padding: "14px",
                borderRadius: "10px",
                border: "none",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Send Message
            </button>

            <p
              style={{
                marginTop: "12px",
                fontSize: "13px",
                color: "#64748B",
                textAlign: "center",
              }}
            >
              Form submission backend will be connected later.
            </p>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          backgroundColor: "#2563EB",
          padding: "64px 20px",
          textAlign: "center",
          color: "#FFFFFF",
        }}
      >
        <h2 style={{ fontSize: "32px", fontWeight: 700 }}>
          Ready to Start Your Project?
        </h2>
        <p style={{ marginTop: "12px", color: "#DBEAFE" }}>
          Let’s discuss your idea and turn it into a working solution.
        </p>
      </section>
    </main>
  );
}

/* INPUT STYLE */
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  marginBottom: "16px",
  borderRadius: "10px",
  border: "1px solid #CBD5E1",
  fontSize: "15px",
  outline: "none",
  backgroundColor: "#FFFFFF",
};
