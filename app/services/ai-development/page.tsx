export const metadata = {
  title: "AI Solutions | Prelhe",
  description:
    "AI-based solutions for automation, analytics and digital transformation.",
};

export default function AISolutionsPage() {
  return (
    <main>
      <ServiceHero
        title="AI Solutions"
        subtitle="AI where it actually adds value"
      />

      <ServiceFeatures
        features={[
          "AI Assistants",
          "Business Automation",
          "AI API Integration",
          "Custom AI Tools",
          "Secure AI Systems",
        ]}
      />

      <ServiceProcess
        steps={[
          "Use Case Identification",
          "AI Planning",
          "Development",
          "Testing",
          "Deployment",
        ]}
      />

      <CTA title="Explore AI Solutions" buttonText="Discuss AI Project" />
    </main>
  );
}
