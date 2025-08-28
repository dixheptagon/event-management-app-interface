import HeroSection from "@/components/shared/landing-page/hero.section";
import FeaturedEvents from "@/components/shared/landing-page/featured.events";

export default function Home() {
  return (
    <div className="mt-8 flex h-screen w-full flex-col items-center gap-5">
      <HeroSection />
      <FeaturedEvents />
    </div>
  );
}
