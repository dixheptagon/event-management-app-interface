import axiosInstance from "@/utils/axios.instance";
import formatDateRange from "@/utils/format.date.range";
import formatPrice from "@/utils/format.price.idr";
import { Calendar, DollarSign } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Event Card Component
export const EventCard = ({ event, index }: any) => {
  return (
    <Link
      href={`/events/${event.id}`}
      key={index}
      className="group rounded-2xl bg-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
    >
      {/* Gambar */}
      <img
        src={event?.eventMedia[0]?.url}
        alt={event?.title}
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
        <p className="text-sm text-gray-600">{event.organizer?.fullname}</p>
      </div>
    </Link>
  );
};
