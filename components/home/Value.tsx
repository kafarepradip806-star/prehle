import Card3D from "@/components/ui/Card3D";

export default function Value() {
  return (
    <div style={wrap}>
      <Card3D>
        <h3>AI-First Development</h3>
        <p>Projects start instantly using artificial intelligence</p>
      </Card3D>
      <Card3D>
        <h3>Human Quality Control</h3>
        <p>Every project is reviewed by real developers</p>
      </Card3D>
      <Card3D>
        <h3>Pay Only When Ready</h3>
        <p>Preview before paying a single rupee</p>
      </Card3D>
    </div>
  );
}

const wrap = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
  gap: 40,
};
