"use client";

export default function HeroFlow() {
  return <div style={flow} />;
}

const flow = {
  position:"absolute",
  inset:0,
  background:
    "radial-gradient(circle at 20% 20%, #3b82f6, transparent 40%),"+
    "radial-gradient(circle at 80% 30%, #D4AF37, transparent 40%),"+
    "radial-gradient(circle at 50% 80%, #2563eb, transparent 40%)",
  animation:"move 10s linear infinite",
  filter:"blur(120px)",
  zIndex:0
};
