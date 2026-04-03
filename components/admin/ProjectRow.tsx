"use client";

export default function ProjectRow({ project, onConvert }: any) {
  return (
    <div style={row}>
      <span>{project.name}</span>
      <span>{project.client}</span>
      <span>{project.status}</span>

      {project.status === "final" && (
        <button style={btn} onClick={() => onConvert(project)}>
          Convert to Template
        </button>
      )}
    </div>
  );
}

const row={
  display:"flex",
  justifyContent:"space-between",
  padding:15,
  background:"#050c18",
  marginBottom:10,
  borderRadius:10
};

const btn={
  background:"#D4AF37",
  border:"none",
  padding:"8px 16px",
  borderRadius:20
};
