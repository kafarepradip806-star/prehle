export const metadata = {
  title: "Automation Services | Prelhe",
  description:
    "Workflow and system automation services to improve efficiency.",
};

export default function AutomationPage() {
  return (
    <main>
      <ServiceHero
        title="Automation Services"
        subtitle="Reduce manual work with smart automation"
      />

      <ServiceFeatures
        features={[
          "Process Automation",
          "Server & System Automation",
          "Scheduled Tasks",
          "Monitoring & Alerts",
          "Operational Efficiency",
        ]}
      />

      <ServiceProcess
        steps={[
          "Process Analysis",
          "Automation Design",
          "Implementation",
          "Testing",
          "Live Monitoring",
        ]}
      />

      <CTA title="Automate Your Operations" buttonText="Talk to Us" />
    </main>
  );
}
