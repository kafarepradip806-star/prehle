"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { saveTemplate } from "@/lib/templateStore";

export default function Admin() {
  const router = useRouter();
  const [stats, setStats] = useState<any>({});
  const [projects, setProjects] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      router.push("/login");
      return;
    }

    Promise.all([
      api("/admin/stats", { headers: { Authorization: "Bearer " + token } }),
      api("/admin/projects", { headers: { Authorization: "Bearer " + token } }),
      api("/admin/clients", { headers: { Authorization: "Bearer " + token } })
    ]).then(([s, p, c]) => {
      setStats(s);
      setProjects(p);
      setClients(c);
      setLoading(false);
    });
  }, []);

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const convertToTemplate = (p: any) => {
    saveTemplate({
      title: p.title,
      type: "Website",
      img: "/templates/custom.png",
      source: p._id,
      fields: ["brand", "phone", "email", "city", "services"]
    });
    alert("Project converted into reusable template!");
  };

  if (loading) return <div style={bg}>Loading…</div>;

  return (
    <div style={bg}>
      {/* Top Bar */}
      <div style={top}>
        <h2>PRELHE Admin</h2>
        <button onClick={logout} style={btn}>Logout</button>
      </div>

      <div style={{ padding: 40 }}>
        <h1>Dashboard</h1>

        {/* Stats */}
        <div style={grid}>
          <div style={card}>Users: {stats.users}</div>
          <div style={card}>Projects: {stats.projects}</div>
          <div style={card}>Revenue: ₹{stats.revenue}</div>
        </div>

        {/* Projects */}
        <h2 style={{ marginTop: 50 }}>Projects</h2>
        {projects.map((p) => (
          <div key={p._id} style={row}>
            <div>
              <b>{p.title}</b> — {p.status} — ₹{p.price}
            </div>

            {p.status === "final" && (
              <button onClick={() => convertToTemplate(p)} style={smallBtn}>
                Convert to Template
              </button>
            )}
          </div>
        ))}

        {/* Clients */}
        <h2 style={{ marginTop: 50 }}>Clients</h2>
        {clients.map((c) => (
          <div key={c._id} style={row}>
            {c.email}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const bg = { minHeight: "100vh", background: "#050c18", color: "white" };

const top = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 20,
  background: "#0f2a44",
  borderBottom: "1px solid rgba(255,255,255,.1)"
};

const btn = {
  background: "#D4AF37",
  border: "none",
  padding: "10px 24px",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: 600
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
  gap: 20,
  marginTop: 30
};

const card = {
  background: "#0f2a44",
  padding: 25,
  borderRadius: 14,
  fontSize: 18
};

const row = {
  background: "#0f2a44",
  padding: 16,
  borderRadius: 12,
  marginTop: 12,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const smallBtn = {
  background: "#D4AF37",
  border: "none",
  padding: "6px 14px",
  borderRadius: 20,
  cursor: "pointer",
  fontSize: 14
};
