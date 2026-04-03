"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "client") {
      router.push("/login");
      return;
    }

    api("/projects/me", {
      headers: { Authorization: "Bearer " + token },
    }).then(setProjects);
  }, []);

  return (
    <div style={bg}>
      {/* HERO AREA */}
      <section style={hero}>
        <h1 style={title}>Welcome to PRELHE</h1>
        <p style={tag}>AI powered software creation platform</p>
        <button style={gold}>Start New Project</button>
      </section>

      {/* INFO STRIP */}
      <section style={infoStrip}>
        <div>🌐 Websites</div>
        <div>📱 Mobile Apps</div>
        <div>🛒 E-Commerce</div>
        <div>🤖 AI Tools</div>
        <div>🖥 Custom Software</div>
      </section>

      {/* PROJECTS */}
      <section style={section}>
        <h2>Your Projects</h2>

        {projects.length === 0 && (
          <p style={{ color: "#aaa" }}>
            No projects yet. Click “Start New Project” to begin.
          </p>
        )}

        <div style={grid}>
          {projects.map((p: any) => (
            <div key={p._id} style={card}>
              <h3>{p.title}</h3>
              <p>Status: {p.status}</p>
              <p>Price: ₹{p.price || 0}</p>

              {p.status === "final" && (
                <button style={goldSmall}>Pay & Launch</button>
              )}

              {p.status === "paid" && (
                <button style={goldSmall}>Open Live Preview</button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ================= STYLES ================= */

const bg = {
  minHeight: "100vh",
  background: "#020712",
  color: "white",
};

const hero = {
  padding: "100px 40px",
  textAlign: "center",
  background: "linear-gradient(135deg,#0f2a44,#020712)",
};

const title = {
  fontSize: 42,
  fontWeight: 900,
};

const tag = {
  color: "#aaa",
  marginTop: 10,
  fontSize: 18,
};

const gold = {
  marginTop: 30,
  padding: "14px 40px",
  background: "#D4AF37",
  border: "none",
  borderRadius: 30,
  fontSize: 16,
  cursor: "pointer",
};

const infoStrip = {
  display: "flex",
  justifyContent: "space-around",
  padding: 20,
  background: "#050c18",
  borderBottom: "1px solid rgba(255,255,255,.05)",
};

const section = {
  padding: 40,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 20,
  marginTop: 20,
};

const card = {
  background: "rgba(255,255,255,.05)",
  padding: 20,
  borderRadius: 14,
  boxShadow: "0 20px 50px rgba(0,0,0,.6)",
};

const goldSmall = {
  marginTop: 10,
  padding: "8px 20px",
  background: "#D4AF37",
  border: "none",
  borderRadius: 20,
  cursor: "pointer",
};
