// components/hero-section.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    src: "/page/HeroSection/1.png",
    alt: "Mahafest 2025",
    cta: "Beli Tiketnya di KiosTix",
  },
  {
    id: 2,
    src: "/page/HeroSection/2.png",
    alt: "Festival Musik",
    cta: "Pesan Sekarang",
  },
  {
    id: 3,
    src: "/page/HeroSection/3.jpeg",
    alt: "Pameran Seni",
    cta: "Dapatkan Tiket",
  },
  {
    id: 4,
    src: "/page/HeroSection/4.jpg",
    alt: "Festival Musik",
    cta: "Pesan Sekarang",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <>
      <main className="relative mx-auto w-full max-w-[90%] rounded-2xl shadow-lg md:max-w-5xl lg:max-w-7xl">
        {/* Hero Container */}
        <div className="relative h-[240px] overflow-hidden rounded-2xl bg-black sm:h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[current].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={slides[current].src}
                alt={slides[current].alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />

              {/* CTA Button */}
              <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4">
                <button className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-amber-700 sm:text-base">
                  {slides[current].cta}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80 p-2 text-black shadow-md backdrop-blur-sm transition hover:scale-110 active:scale-100 sm:left-3 sm:h-10 sm:w-10"
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80 p-2 text-black shadow-md backdrop-blur-sm transition hover:scale-110 active:scale-100 sm:right-3 sm:h-10 sm:w-10"
            aria-label="Next slide"
          >
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="my-3 flex justify-center">
          <div className="flex gap-2 rounded-xl bg-white/30 p-1.5 backdrop-blur-sm">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 w-6 rounded-full transition-all duration-300 ${
                  current === i
                    ? "w-8 bg-[#041846]"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
