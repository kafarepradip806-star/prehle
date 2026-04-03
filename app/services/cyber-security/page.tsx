export const metadata = {
  title: "Cyber Security Services | Prelhe",
  description:
    "Security-first development, audits and data protection solutions.",
};

export default function CyberSecurityPage() {
  return (
    <main>
      <ServiceHero
        title="Cyber Security Services"
        subtitle="Security built into every layer of your system"
      />

      <ServiceFeatures
        features={[
          "Application & API Security",
          "Role-Based Access Control",
          "Encrypted Data Storage",
          "Security Audits",
          "Compliance-Ready Systems",
        ]}
      />

      <ServiceProcess
        steps={[
          "Security Risk Assessment",
          "Protection Strategy Design",
          "Implementation & Hardening",
          "Testing & Audit",
          "Continuous Monitoring",
        ]}
      />

      <CTA title="Secure Your Systems" buttonText="Start Security Audit" />
    </main>
  );
}
