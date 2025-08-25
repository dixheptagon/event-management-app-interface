import Image from "next/image";
import styles from "../styles/page.module.css";
import HeroSection from "@/components/page/hero.section";
import FeaturedEvents from "@/components/page/featured.events";

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col items-center bg-black">
      <HeroSection />
      <FeaturedEvents />
    </div>
  );
}
