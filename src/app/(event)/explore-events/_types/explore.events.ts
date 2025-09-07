interface Event {
  id: number;
  title: string;
  subtitle?: string; // Optional
  date: string;
  price: string;
  organizer: string;
  category: string;
  image?: string; // Optional untuk future use
}

interface Filters {
  location: string;
  category: string;
  locationSearch: string;
  isOnline: boolean;
}

// interface FilterSidebarProps {
//   filters: Filters;
//   onFiltersChange: (filters: Filters) => void;
//   onResetFilters: () => void;
// }

// interface EventCardProps {
//   event: Event;
// }

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   itemsPerPage: number;
//   totalItems: number;
//   onPageChange: (page: number) => void;
// }
