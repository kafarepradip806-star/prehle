"use client";

import { useState } from "react";
import ServiceSummary from "./ServiceSummary";

export default function ServiceItem({ service }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div style={box}>
      {/* HEADER */}
      <div style={header} onClick={() => setOpen(!open)}>
        <h3 style={{ fontSize: "22px", fontWeight: 700 }}>
          {service.title}
        </h3>
        <span style={{ fontSize: "22px" }}>
          {open ? "−" : "+"}
        </span>
      </div>

      {/* SUMMARY */}
      <ServiceSummary text={service.desc} />

      {/* EXPAND CONTENT */}
      {open && (
        <div style={expand}>
          <Section title="Features">
            {service.features.map((f: string) => (
              <li key={f}>{f}</li>
            ))}
          </Section>

          <Section title="Technology">
            {service.tech.map((t: string) => (
              <span key={t} style={badge}>{t}</span>
            ))}
          </Section>

          <Section title="Use Cases">
            {service.useCases.map((u: string) => (
              <div key={u}>• {u}</div>
            ))}
          </Section>
        </div>
      )}
    </div>
  );
}

/* SMALL SECTION */
function Section({ title, children }: any) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h4 style={{ fontSize: "16px", fontWeight: 700 }}>{title}</h4>
      <div style={{ marginTop: "8px" }}>{children}</div>
    </div>
  );
}

/* STYLES */
const box = {
  padding: "24px",
  borderBottom: "1px solid #ddd",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  cursor: "pointer",
};

const expand = {
  marginTop: "10px",
};

const badge = {
  display: "inline-block",
  background: "#eef",
  padding: "4px 10px",
  borderRadius: "10px",
  marginRight: "6px",
  fontSize: "13px",
};
