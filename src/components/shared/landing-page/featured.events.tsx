// components/featured-events.tsx
"use client";

import axiosInstance from "@/utils/axios.instance";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

// Fungsi: Format tanggal dari ISO ke DD Mon - DD Mon YYYY
function formatDateRange(startDateStr: string, endDateStr: string): string {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const startFormatted = startDate.toLocaleDateString("en-US", options);
  const endFormatted = endDate.toLocaleDateString("en-US", options);

  // Jika tanggal sama, tampilkan sekali
  if (startDate.toDateString() === endDate.toDateString()) {
    return startFormatted;
  }

  // Jika bulan sama, cukup ubah tanggalnya saja
  if (
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear()
  ) {
    return `${startDate.getDate()} - ${endDate.getDate()} ${startDate.toLocaleString(
      "en-US",
      { month: "short" },
    )} ${startDate.getFullYear()}`;
  }

  // Format umum
  return `${startFormatted} - ${endFormatted}`;
}

// Fungsi: Format harga (PAID atau FREE)
function formatPrice(
  ticketTypes: { price: number; ticketType: string }[],
): string {
  const freeTicket = ticketTypes.find((t) => t.ticketType === "FREE");
  if (freeTicket) return "FREE";

  const paidTicket = ticketTypes.find((t) => t.ticketType === "PAID");
  if (paidTicket) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(paidTicket.price);
  }

  return "FREE"; // fallback
}

export default function FeaturedEvents() {
  const [eventsData, setEventsData] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const onGetListEvents = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("api/list-events");
      console.log(response);
      setEventsData(response?.data?.data || []);
    } catch (error) {
      toast.error("Internal Server Error : Failed to get events!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetListEvents();
  }, []);

  // Backend sudah membatasi 12 events, jadi gunakan semua data
  const featuredEvents = eventsData;
  const eventsPerSlide = 4;
  const totalSlides = Math.ceil(featuredEvents.length / eventsPerSlide);

  // Fungsi navigasi slider
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  // Dapatkan events untuk slide saat ini
  // const getCurrentSlideEvents = () => {
  //   const startIndex = currentSlide * eventsPerSlide;
  //   const endIndex = startIndex + eventsPerSlide;
  //   return featuredEvents.slice(startIndex, endIndex);
  // };

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-[90%] sm:max-w-2xl md:max-w-4xl lg:max-w-7xl">
        <h2 className="text-2xl font-bold text-[#041846] sm:text-3xl">
          Featured Events
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="my-5 animate-pulse rounded-2xl bg-gray-200 shadow-lg"
            >
              <div className="h-48 w-full rounded-t-2xl bg-gray-300"></div>
              <div className="p-4">
                <div className="mb-2 h-4 rounded bg-gray-300"></div>
                <div className="mb-2 h-3 rounded bg-gray-300"></div>
                <div className="mb-2 h-4 rounded bg-gray-300"></div>
                <hr className="my-2 border-gray-200" />
                <div className="h-3 rounded bg-gray-300"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (featuredEvents.length === 0) {
    return (
      <section className="mx-auto w-full max-w-[90%] sm:max-w-2xl md:max-w-4xl lg:max-w-7xl">
        <h2 className="text-2xl font-bold text-[#041846] sm:text-3xl">
          Featured Events
        </h2>
        <div className="mt-6 py-12 text-center">
          <p className="text-gray-500">
            Tidak ada event yang tersedia saat ini.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[90%] sm:max-w-2xl md:max-w-4xl lg:max-w-7xl">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#041846] sm:text-3xl">
          Featured Events
        </h2>

        {/* Explore Events Button */}
        <Link
          href="/explore-events"
          className="group flex items-center gap-2 rounded-full bg-[#041846] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#062555] hover:shadow-lg"
        >
          Explore Events
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Slider Container */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Events Grid */}
        <div className="overflow-hidden rounded-xl">
          <div
            className="mx-2 my-10 flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="grid min-w-full grid-cols-1 gap-6 px-2 sm:grid-cols-2 lg:grid-cols-4"
              >
                {featuredEvents
                  .slice(
                    slideIndex * eventsPerSlide,
                    (slideIndex + 1) * eventsPerSlide,
                  )
                  .map((event, eventIndex) => (
                    <Link
                      href={`/events/${event.id || "not-found"}`}
                      key={`${slideIndex}-${eventIndex}`}
                      className="group relative rounded-2xl bg-white shadow-lg transition-all duration-300 ease-in-out hover:z-10 hover:scale-105 hover:shadow-xl"
                    >
                      {/* Gambar */}
                      <img
                        src={
                          event.eventMedia[0]?.url || "/placeholder-event.jpg"
                        }
                        alt={event.title}
                        className="h-48 w-full rounded-t-2xl object-cover object-center"
                      />

                      {/* Konten */}
                      <div className="p-4">
                        <h3 className="line-clamp-2 min-h-[3.5rem] text-base font-medium text-gray-900 group-hover:text-blue-600">
                          {event.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {formatDateRange(event.startDate, event.endDate)}
                        </p>
                        <p className="mt-1 text-lg font-semibold text-gray-800">
                          {formatPrice(event.ticketTypes)}
                        </p>
                        <hr className="my-2 border-gray-200" />
                        <p className="text-sm text-gray-600">
                          {event.organizer?.fullname || "Unknown Organizer"}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls - hanya tampil jika ada lebih dari 1 slide */}
        {totalSlides > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={goToPrevSlide}
              className="absolute top-1/2 left-0 z-10 -translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-xl"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>

            {/* Next Button */}
            <button
              onClick={goToNextSlide}
              className="absolute top-1/2 right-0 z-10 translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-xl"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </>
        )}
      </div>

      {/* Slide Indicators - hanya tampil jika ada lebih dari 1 slide */}
      {totalSlides > 1 && (
        <div className="mt-6 flex justify-center space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-[#041846]"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Events Counter */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Shows {Math.min(featuredEvents.length, eventsPerSlide)} from{" "}
          {featuredEvents.length} featured events
        </p>
      </div>
    </section>
  );
}
