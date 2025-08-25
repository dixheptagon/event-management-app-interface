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
    <main className="relative mx-auto !mt-12 h-6/12 w-full max-w-10/12">
      <div className="relative h-[300px] overflow-hidden rounded-2xl bg-black !shadow-2xl">
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
              className="rounded-2xl object-cover"
              priority
            />
            {/* CTA Button */}
            <div className="absolute right-6 bottom-6">
              <button className="rounded-lg bg-amber-600 px-4 py-2 text-white shadow transition hover:bg-amber-700">
                {slides[current].cta}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-1 h-8 w-8 -translate-y-1/2 rounded-full bg-white p-2 text-black shadow transition hover:scale-110"
        >
          <ArrowLeft className="h-4 w-4 translate-x-1/2" />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 rounded-full bg-white p-2 text-black shadow transition hover:scale-110"
        >
          <ArrowRight className="h-4 w-4 translate-x-1/2" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute !-bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-6 rounded-full transition-all ${
              current === i ? "w-8 bg-[#041846]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </main>
  );
}
