import { TicketType } from "../_types/types.create.event";

const EventSummary: React.FC<{
  ticketTypes: TicketType[];
}> = ({ ticketTypes }) => {
  const totalCapacity = ticketTypes.reduce(
    (sum, ticket) => sum + (Number(ticket.quantity) || 0),
    0,
  );

  const prices = ticketTypes
    .filter((t) => t.price)
    .map((t) => Number(t.price))
    .filter((p) => !isNaN(p) && p > 0);

  const priceRange =
    prices.length > 0
      ? `IDR ${Math.min(...prices).toLocaleString()} - ${Math.max(...prices).toLocaleString()}`
      : "Not set";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Event Summary
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Total Ticket Types:</span>
          <span className="font-medium">{ticketTypes.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Capacity:</span>
          <span className="font-medium">{totalCapacity.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Price Range:</span>
          <span className="font-medium">{priceRange}</span>
        </div>
      </div>
    </div>
  );
};

export default EventSummary;
