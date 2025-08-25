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
    <section className="relative mx-auto !mb-2 w-full max-w-10/12 overflow-hidden shadow-lg">
      <h2 className="!py-6 text-2xl font-semibold text-white">
        Featured Events
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {events.map((event) => (
          <Link
            href={`/events/${event.id}`}
            key={event.id}
            className="rounded-2xl bg-white shadow transition hover:shadow-lg"
          >
            <img
              src={event.image}
              alt={event.title}
              className="h-35 w-full rounded-t-2xl object-fill"
            />
            <div className="!p-4">
              <h3 className="truncate font-medium text-gray-900">
                {event.title}
              </h3>
              <p className="text-sm text-gray-500">{event.date}</p>
              <p className="mt-1 font-semibold">{event.price}</p>
              <hr className="!my-2" />
              <p className="text-sm text-gray-600">{event.organizer}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
