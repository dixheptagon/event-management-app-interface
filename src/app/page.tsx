import HeroSection from "@/components/page/hero.section";
import FeaturedEvents from "@/components/page/featured.events";

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col items-center">
      <HeroSection />
      <FeaturedEvents />
    </div>
  );
}
