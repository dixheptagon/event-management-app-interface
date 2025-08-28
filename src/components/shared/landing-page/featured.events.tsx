// components/featured-events.tsx
"use client";

import Link from "next/link";

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

export default function FeaturedEvents() {
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
      </div>
    </section>
  );
}
