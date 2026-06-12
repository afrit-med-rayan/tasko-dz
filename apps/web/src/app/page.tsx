import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CategoryShowcase } from "@/components/landing/CategoryShowcase";
import { FeaturedFreelancers } from "@/components/landing/FeaturedFreelancers";
import { DemoShowcase } from "@/components/landing/DemoShowcase";
import { TrustSection } from "@/components/landing/TrustSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { CtaBanner } from "@/components/landing/CtaBanner";

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <HowItWorks />
      <CategoryShowcase />
      <FeaturedFreelancers />
      <DemoShowcase />
      <TrustSection />
      <Testimonials />
      <CtaBanner />
    </PageShell>
  );
}
