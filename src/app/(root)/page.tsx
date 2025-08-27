import HeroSection from "@/components/shared/landing-page/hero.section";
import FeaturedEvents from "@/components/shared/landing-page/featured.events";

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col items-center">
      <HeroSection />
      <FeaturedEvents />
    </div>
  );
}
