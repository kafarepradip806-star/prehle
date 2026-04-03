"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function ClientProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("token");
      const data = await api("/projects/me", {
        headers: { Authorization: "Bearer " + token }
      });
      setProjects(data);
    };
    load();
  }, []);

  return (
    <div style={{ marginTop: 30 }}>
      <h2>Your Projects</h2>

      {projects.length === 0 && <p>No projects yet</p>}

      {projects.map((p: any) => (
        <div key={p._id} style={card}>
          <h3>{p.title}</h3>
          <p>Status: {p.status}</p>
          <p>Price: ₹{p.price || 0}</p>

          {p.status === "final" && (
            <button style={btn}>Pay & Start</button>
          )}
        </div>
      ))}
    </div>
  );
}

const card = {
  background: "#0f2a44",
  padding: 20,
  borderRadius: 12,
  marginBottom: 20,
  color: "white"
};

const btn = {
  marginTop: 10,
  padding: "10px 20px",
  background: "#D4AF37",
  border: "none",
  borderRadius: 10,
  cursor: "pointer"
};
