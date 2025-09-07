"use client";
import { useEffect, useState } from "react";
import { FilterSidebar } from "./filtering";
import { Pagination } from "./pagenation";
import { EventCard } from "./event.card";
import axiosInstance from "@/utils/axios.instance";
import { toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";
import useEventsStore from "@/stores/explore.events.store";
import { Loader } from "lucide-react";

// Main Component
export default function ExploreEventsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    setLocalFilters,
    setKeyword,
    setCurrentPage,
    setItemsPerPage,
    currentPage,
    itemsPerPage,
  } = useEventsStore();

  // ambil semua query params dari URL
  const keyword = searchParams.get("keyword") || "";
  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limitFromUrl = parseInt(searchParams.get("limit") || "8", 10);

  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Sinkronkan limit dari URL ke store saat pertama kali
  useEffect(() => {
    if (limitFromUrl !== itemsPerPage) {
      setItemsPerPage(limitFromUrl);
    }
  }, [limitFromUrl, itemsPerPage, setItemsPerPage]);

  // Sync currentPage dari URL ke store
  useEffect(() => {
    setCurrentPage(page);
  }, [page, setCurrentPage]);

  // Fetch Events
  const onGetEvents = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("api/explore-events", {
        params: {
          keyword: keyword || undefined,
          location: location || undefined,
          category: category || undefined,
          limit: itemsPerPage,
          skip: (currentPage - 1) * itemsPerPage,
        },
      });
      const { events, totalItems, totalPages } = response.data.data;

      setEventsData(events || []);
      setTotalPages(totalPages || 1);
      setTotalItems(totalItems || 0);
    } catch (error) {
      toast.error("Internal Server Error : Failed to get events!");
    } finally {
      setIsLoading(false);
    }
  };

  // Refetch saat filter atau halaman/limit berubah
  useEffect(
    () => {
      onGetEvents();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [keyword, location, category, currentPage, itemsPerPage],
  );

  // Ubah halaman
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) params.delete("page");
    else params.set("page", page.toString());

    router.push(`/explore-events?${params.toString()}`);
  };

  // Ubah jumlah item per halaman
  const handleItemsPerPageChange = (newLimit: number) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1); // reset ke halaman 1

    const params = new URLSearchParams(searchParams.toString());
    if (newLimit === 8) params.delete("limit");
    else params.set("limit", newLimit.toString());

    params.set("page", "1"); // pastikan page 1
    router.push(`/explore-events?${params.toString()}`);
  };

  // Update filters → ubah URL query params
  const handleFiltersChange = (newFilters: any) => {
    const params = new URLSearchParams();

    if (newFilters.location) params.set("location", newFilters.location);
    if (newFilters.category) params.set("category", newFilters.category);
    if (keyword) params.set("keyword", keyword);

    // Reset page ke 1 saat filter berubah
    params.set("page", "1");

    router.push(`/explore-events?${params.toString()}`);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    const params = new URLSearchParams();
    params.set("page", "1"); // tetap reset ke halaman 1

    router.push(`/explore-events?${params.toString()}`);
    setLocalFilters({});
    setKeyword("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto w-full">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={{ location, category }}
            onFiltersChange={handleFiltersChange}
            onResetFilters={resetFilters}
          />

          {/* Main Content */}
          <div className="mt-10 flex-1">
            {/* Loading State */}
            {isLoading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                <p className="text-center text-gray-500">Loading events...</p>
              </div>
            ) : eventsData.length === 0 ? (
              <p className="text-center text-gray-500">No events found.</p>
            ) : (
              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {eventsData.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
