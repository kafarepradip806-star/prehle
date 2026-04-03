export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={card}>
      {children}
    </div>
  );
}

const card = {
  background: "rgba(255,255,255,.04)",
  borderRadius: 20,
  padding: 30,
  boxShadow: "0 30px 80px rgba(0,0,0,.9)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,.05)",
  transition: ".3s",
};
