type Ticket = {
  price: number;
  ticketType: string;
};

function getLowestPriceLabel(tickets: Ticket[]): string {
  if (!tickets || tickets.length === 0) return "-";

  // cari harga terendah
  const lowest = tickets.reduce((min, ticket) => {
    return ticket.price < min ? ticket.price : min;
  }, tickets[0].price);

  // kalau 0 → Free, kalau > 0 → format rupiah
  if (lowest === 0) return "Free";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(lowest);
}

export default getLowestPriceLabel;
