export default function Stats() {
  return (
    <div style={wrap}>
      <div><h2>120+</h2><p>Projects Created</p></div>
      <div><h2>85+</h2><p>Clients Served</p></div>
      <div><h2>500+</h2><p>AI Designs</p></div>
    </div>
  );
}

const wrap={
  display:"flex",
  justifyContent:"space-around",
  padding:60,
  background:"#050c18",
  color:"white"
};
