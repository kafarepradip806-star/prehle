"use client";
import Card3D from "@/components/ui/Card3D";

export default function TemplateCard({ title, type, img, onClick }: any) {
  return (
    <Card3D>
      <img src={img} style={{ width: "100%", borderRadius: 12, marginBottom: 15 }} />
      <h3>{title}</h3>
      <p style={{ color: "#aaa" }}>{type}</p>
      <button onClick={onClick} style={btn}>Use this</button>
    </Card3D>
  );
}

const btn = {
  marginTop: 10,
  background: "#D4AF37",
  border: "none",
  padding: "10px 24px",
  borderRadius: 20,
  cursor: "pointer",
};
