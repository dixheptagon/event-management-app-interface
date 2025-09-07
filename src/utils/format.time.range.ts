export function formatTimeRange(start: string, end: string): string {
  if (!start || !end) return "";

  const startDate = new Date(start);
  const endDate = new Date(end);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // biar 24 jam
    timeZone: "Asia/Jakarta", // WIB
  };

  const startTime = startDate.toLocaleTimeString("en-US", options);
  const endTime = endDate.toLocaleTimeString("en-US", options);

  return `${startTime} - ${endTime} WIB`;
}
