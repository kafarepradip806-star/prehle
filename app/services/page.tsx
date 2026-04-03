import ServicesHero from "@/components/services/ServicesHero";
import ServicesIntro from "@/components/services/ServicesIntro";
import DomainHosting from "@/components/services/DomainHosting";
import CloudInfrastructure from "@/components/services/CloudInfrastructure";
import CloudService from "@/components/services/CloudServices";
import SecuritySupport from "@/components/services/SecurityAndSupport";
import ServicesProcess from "@/components/services/ServicesProcess";
import ServicesCTA from "@/components/services/ServicesCTA";

export default function ServicesPage() {
  return (
    <main style={{ fontFamily: "system-ui" }}>
      <ServicesHero />
      <ServicesIntro />
      <DomainHosting />
      <CloudInfrastructure />
      <CloudService />
      <SecuritySupport />
      <ServicesProcess />
      <ServicesCTA />
    </main>
  );
}
