import Card3D from "./Card3D";

export default function ServiceCard({ icon, title, desc }: any) {
  return (
    <Card3D>
      <div style={{fontSize:40}}>{icon}</div>
      <h3>{title}</h3>
      <p style={{color:"#aaa"}}>{desc}</p>
    </Card3D>
  );
}
