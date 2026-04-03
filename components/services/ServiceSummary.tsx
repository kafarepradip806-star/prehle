export default function ServiceSummary({ text }: { text: string }) {
  return (
    <p style={summary}>
      {text}
    </p>
  );
}

const summary = {
  marginTop: "8px",
  color: "#555",
  lineHeight: "1.5",
};
