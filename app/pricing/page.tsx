import PricingHero from "@/components/pricing/PricingHero";
import HostingPricingPlans from "@/components/pricing/HostingPlans";
import CloudPricingPlans from "@/components/pricing/CloudPricingPlans";
import PricingCTA from "@/components/pricing/PricingCTA";

export default function PricingPage() {
  return (
    <main style={{ fontFamily: "system-ui" }}>
      <PricingHero />
      <HostingPricingPlans />
      <CloudPricingPlans />
      <PricingCTA />
    </main>
  );
}
