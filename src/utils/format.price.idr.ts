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

export default formatPrice;
