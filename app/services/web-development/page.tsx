export const metadata = {
  title: "Website Development Company | Prelhe",
  description:
    "Professional website design and development services for businesses.",
};

export default function WebDevelopmentPage() {
  return (
    <main>
      <ServiceHero
        title="Website Development"
        subtitle="Fast, responsive and SEO-friendly websites"
      />

      <ServiceFeatures
        features={[
          "Business & Corporate Websites",
          "Admin Panels",
          "SEO Friendly Structure",
          "Responsive Design",
          "Secure Hosting Integration",
        ]}
      />

      <ServiceProcess
        steps={[
          "Design Planning",
          "UI Development",
          "Backend Integration",
          "Testing",
          "Launch",
        ]}
      />

      <CTA title="Build Your Website" buttonText="Get Started" />
    </main>
  );
}
