import { HeroSection } from "@/components/marketing/hero-section";
import { FeaturedFleet } from "@/components/marketing/featured-fleet";
import { WhyVeyra } from "@/components/marketing/why-veyra";
import { ServiceBlocks } from "@/components/marketing/service-blocks";
import { ReviewsSection } from "@/components/marketing/reviews-section";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { CityPreview } from "@/components/marketing/city-preview";
import { FinalCTA } from "@/components/marketing/final-cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedFleet />
      <WhyVeyra />
      <ServiceBlocks />
      <ReviewsSection />
      <HowItWorks />
      <CityPreview />
      <FinalCTA />
    </>
  );
}
