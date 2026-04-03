export default function Toast({ text }: any) {
  return (
    <div style={{
      position:"fixed",
      bottom:20,
      left:"50%",
      transform:"translateX(-50%)",
      background:"#3b82f6",
      color:"white",
      padding:"12px 24px",
      borderRadius:20,
      boxShadow:"0 0 20px rgba(59,130,246,.8)"
    }}>
      {text}
    </div>
  );
}
