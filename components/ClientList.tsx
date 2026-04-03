"use client";

export default function ClientList({ clients }) {
  return (
    <div style={{ background:"#0F2A44", padding:30, borderRadius:20 }}>
      <h2>Clients</h2>

      {clients.length === 0 && <p style={{ color:"#aaa" }}>No clients yet</p>}

      {clients.map(c => (
        <div key={c.id} style={{
          padding:"12px 0",
          borderBottom:"1px solid rgba(255,255,255,.1)"
        }}>
          <strong>{c.name}</strong><br/>
          <span style={{ color:"#aaa" }}>{c.email}</span><br/>
          <span style={{ color:"#aaa" }}>{c.mobile}</span>
        </div>
      ))}
    </div>
  );
}
