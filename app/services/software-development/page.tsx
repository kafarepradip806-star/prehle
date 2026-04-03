import ServiceHero from "@/components/Services/ServiceHero";
import ServiceFeatures from "@/components/Services/ServiceCategory";
import ServiceProcess from "@/components/Services/ServiceCard";
import CTA from "@/components/Services/ServiceCTA";

export const metadata = {
  title: "Software Development Services | Prelhe",
  description:
    "Custom software development services for startups, businesses and enterprises.",
};

export default function SoftwareDevelopmentPage() {
  return (
    <main>
      <ServiceHero
        title="Software Development Services"
        subtitle="Reliable, scalable and secure software solutions"
      />

      <ServiceFeatures
        features={[
          "Custom Business Software",
          "Web & Enterprise Applications",
          "Backend & API Development",
          "Admin Panels & Dashboards",
          "Maintenance & Support",
        ]}
      />

      <ServiceProcess
        steps={[
          "Requirement Discussion",
          "System Design & Planning",
          "Development & Testing",
          "Deployment",
          "Ongoing Support",
        ]}
      />

      <CTA title="Start Your Software Project" buttonText="Contact Us" />
    </main>
  );
}
