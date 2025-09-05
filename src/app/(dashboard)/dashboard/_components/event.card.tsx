import { Calendar, MoreHorizontal, Ticket } from "lucide-react";

// Event Card Component
const EventCard = ({ event }: any) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2">
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  event.status === "expired"
                    ? "bg-red-100 text-red-700"
                    : event.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                }`}
              >
                {event.statusLabel}
              </span>
            </div>
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              {event.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Ticket size={16} />
                <span>{event.ticketCount} Tiket</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">{event.purchaseInfo}</p>
          </div>
          <div className="flex items-start gap-4">
            <button className="rounded-lg p-2 transition-colors hover:bg-gray-100">
              <MoreHorizontal size={20} className="text-gray-500" />
            </button>
            <div className="relative h-32 w-48 overflow-hidden rounded-lg bg-gradient-to-br from-slate-800 to-slate-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="mb-1 text-lg font-bold">Cinta</h3>
                  <h3 className="mb-1 text-lg font-bold">Kala</h3>
                  <h3 className="text-lg font-bold">Senja</h3>
                  <div className="mt-2 text-xs opacity-75">
                    <div>BARASUARA</div>
                    <div>NADHIF BASALAMAH</div>
                  </div>
                </div>
              </div>
              <div className="absolute top-2 right-2 h-8 w-16 rounded bg-yellow-400 opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
