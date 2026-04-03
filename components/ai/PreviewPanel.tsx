"use client";

export default function PreviewPanel({ template, data }: any) {
  if (!template) {
    return <div style={empty}>Select a template to preview</div>;
  }

  return (
    <div style={preview}>
      <h1>{data.brand || "Your Brand"}</h1>
      <p>{data.business || "Your Business"}</p>
      <div style={{
        marginTop: 20,
        padding: 20,
        background: data.color || "#D4AF37",
        borderRadius: 12
      }}>
        Live Preview
      </div>
    </div>
  );
}

const preview={padding:40,color:"white"};
const empty={padding:40,color:"#888"};
