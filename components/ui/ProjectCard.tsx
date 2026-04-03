import Card from "./Card";

export default function ProjectCard({ project }: any) {
  return (
    <Card>
      <h3>{project.title}</h3>
      <p>Status: {project.status}</p>
      <p>Price: ₹{project.price}</p>

      {project.status==="final" && <button>Pay</button>}
      {project.status==="paid" && <button>Open</button>}
    </Card>
  );
}
