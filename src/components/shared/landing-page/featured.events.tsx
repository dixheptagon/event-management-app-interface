// components/featured-events.tsx
"use client";

import axiosInstance from "@/utils/axios.instance";
import { AxiosError } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Event = {
  id: string;
  title: string;
  date: string;
  price: string;
  organizer: string;
  image: string;
};

const events: Event[] = [
  {
    id: "bandung-summit",
    title: "Bandung Sustainability Summit 2025",
    date: "18 Sep - 19 Sep 2025",
    price: "Rp3.500.000",
    organizer: "Charaka Gurat Rupa",
    image: "/page/FeaturedEvents/1.png",
  },
  {
    id: "spotify-stay",
    title: "SPOTIFY STAYdium",
    date: "22 Aug - 25 Aug 2025",
    price: "Gratis",
    organizer: "Acteeve Indonesia",
    image: "/page/FeaturedEvents/2.jpeg",
  },
  {
    id: "cinta-kala-senja",
    title: "Cinta Kala Senja - Barasuara",
    date: "25 Sep 2025",
    price: "Rp200.000",
    organizer: "Bengkel Space",
    image: "/page/FeaturedEvents/3.jpg",
  },
  {
    id: "lotr-concert",
    title: "The Lord Of The Rings The Fellowship In Concert",
    date: "20 Sep 2025",
    price: "Rp1.450.000",
    organizer: "SISTIC",
    image: "/page/FeaturedEvents/4.jpeg",
  },
];

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
  if (freeTicket) return "Gratis";

  const paidTicket = ticketTypes.find((t) => t.ticketType === "PAID");
  if (paidTicket) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(paidTicket.price);
  }

  return "Gratis"; // fallback
}

export default function FeaturedEvents() {
  const [eventsData, setEventsData] = useState<any[]>([]);
  const onGetListEvents = async () => {
    try {
      const response = await axiosInstance.get("api/list-events");

      console.log(response);
      setEventsData(response?.data?.data);
    } catch (error) {
      // const err = error as AxiosError<{ error: string; message: string }>;

      toast.error("Internal Server Error : Failed to get events!");
    }
  };

  useEffect(() => {
    onGetListEvents();
  }, []);

  return (
    <section className="mx-auto w-full max-w-[90%] sm:max-w-2xl md:max-w-4xl lg:max-w-7xl">
      {/* Judul */}
      <h2 className="text-2xl font-bold text-[#041846] sm:text-3xl">
        Featured Events
      </h2>

      {/* Grid Events */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {events.map((event) => (
          <Link
            href={`/events/${event.id}`}
            key={event.id}
            className="group rounded-2xl bg-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
          >
            {/* Gambar */}
            <img
              src={event.image}
              alt={event.title}
              className="h-48 w-full rounded-t-2xl object-cover object-center"
            />

            {/* Konten */}
            <div className="p-4">
              <h3 className="line-clamp-2 min-h-[3.5rem] text-base font-medium text-gray-900 group-hover:text-blue-600">
                {event.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{event.date}</p>
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {event.price}
              </p>
              <hr className="my-2 border-gray-200" />
              <p className="text-sm text-gray-600">{event.organizer}</p>
            </div>
          </Link>
        ))}

        {/* Events data from API */}
        {eventsData.map((event, index) => (
          <Link
            href={`/events/${event.id || "not-found"}`}
            key={index}
            className="group rounded-2xl bg-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
          >
            {/* Gambar */}
            <img
              src={event.eventMedia[0].url}
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
    </section>
  );
}
