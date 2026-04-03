export const metadata = {
  title: "Cloud & DevOps Services | Prelhe",
  description:
    "Secure, scalable and cost-optimized cloud infrastructure solutions.",
};

export default function CloudDevOpsPage() {
  return (
    <main>
      <ServiceHero
        title="Cloud & DevOps Services"
        subtitle="Infrastructure that scales with your business"
      />

      <ServiceFeatures
        features={[
          "Cloud Setup & Migration",
          "Docker & Kubernetes",
          "CI/CD Pipelines",
          "Monitoring & Backup",
          "High Availability Systems",
        ]}
      />

      <ServiceProcess
        steps={[
          "Infrastructure Planning",
          "Cloud Architecture Design",
          "Deployment Automation",
          "Security & Monitoring Setup",
          "Optimization & Support",
        ]}
      />

      <CTA title="Upgrade Your Infrastructure" buttonText="Go Cloud" />
    </main>
  );
}
