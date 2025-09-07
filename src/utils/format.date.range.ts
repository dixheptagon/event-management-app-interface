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

export default formatDateRange;
