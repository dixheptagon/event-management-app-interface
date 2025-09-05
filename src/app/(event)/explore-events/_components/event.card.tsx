import axiosInstance from "@/utils/axios.instance";
import formatDateRange from "@/utils/format.date.range";
import formatPrice from "@/utils/format.price.idr";
import getLowestPriceLabel from "@/utils/getLowestPrice";
import Link from "next/link";

// Event Card Component
export const EventCard = ({ event, index }: any) => {
  return (
    <Link
      href={
        `/event-details/${event.title} ${event.id}` || `/events/${undefined}`
      }
      key={index}
      className="group rounded-2xl bg-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
    >
      {/* Gambar */}
      <div className="aspect-[17/9] w-full">
        <img
          src={event.eventMedia[0]?.url || "/placeholder-event.jpg"}
          alt={event.title}
          className="h-full w-full rounded-t-2xl object-cover object-center"
        />
      </div>

      {/* Konten */}
      <div className="p-4">
        <h3 className="line-clamp-2 min-h-[3.5rem] text-base font-medium text-gray-900 group-hover:text-blue-600">
          {event.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {formatDateRange(event.startDate, event.endDate)}
        </p>
        <p className="mt-1 text-lg font-semibold text-gray-800">
          {getLowestPriceLabel(event?.ticketTypes ?? [])}
        </p>
        <hr className="my-2 border-gray-200" />
        <p className="text-sm text-gray-600">{event.organizer?.fullname}</p>
      </div>
    </Link>
  );
};
