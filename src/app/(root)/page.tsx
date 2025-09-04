import HeroSection from "@/components/shared/landing-page/hero.section";
import FeaturedEvents from "@/components/shared/landing-page/featured.events";

export default function Home() {
  return (
    <div className="mt-8 mb-400 flex h-screen w-full flex-col items-center gap-5 md:mb-200 lg:mb-80">
      <HeroSection />
      <FeaturedEvents />
    </div>
  );
}
