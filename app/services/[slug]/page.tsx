import ServiceHero from "@/components/service-detail/hero/ServiceHero";
import ServiceOverview from "@/components/service-detail/overview/ServiceOverview";
import ServiceFeatures from "@/components/service-detail/features/ServiceFeatures";
import ServiceProcess from "@/components/service-detail/process/ServiceProcess";
import ServiceTechStack from "@/components/service-detail/tech/ServiceTechStack";
import ServiceUseCases from "@/components/service-detail/use-cases/ServiceUseCases";
import ServiceTrust from "@/components/service-detail/trust/ServiceTrust";
import ServiceFAQ from "@/components/service-detail/faq/ServiceFAQ";
import ServiceFinalCTA from "@/components/service-detail/cta/ServiceFinalCTA";

export default function ServiceDetailPage() {
  return (
    <main>
      <ServiceHero />
      <ServiceOverview />
      <ServiceFeatures />
      <ServiceProcess />
      <ServiceTechStack />
      <ServiceUseCases />
      <ServiceTrust />
      <ServiceFAQ />
      <ServiceFinalCTA />
    </main>
  );
}
