import HeroSection from "@/components/hero-section/HeroSection";
import PricingSection from "@/components/pricing/PricingSection";
import StatsSection from "@/components/stats-section/StatsSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <PricingSection />
    </div>
  );
}
