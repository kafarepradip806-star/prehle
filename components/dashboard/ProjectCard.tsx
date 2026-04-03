import Card from "@/components/ui/Card";

export default function ProjectCard({ project }: any) {
  return (
    <Card>
      <h3>{project.name}</h3>
      <p>Status: {project.status}</p>
      <p>₹{project.price}</p>

      {project.status==="preview" && <button>View Preview</button>}
      {project.status==="final" && <button>Pay Now</button>}
      {project.status==="live" && <button>Open</button>}
    </Card>
  );
}
