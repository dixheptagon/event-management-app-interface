"use client";
import { useEffect, useState } from "react";
import { FilterSidebar } from "./filtering";
import { Pagination } from "./pagenation";
import { EventCard } from "./event.card";
import axiosInstance from "@/utils/axios.instance";
import { toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";
import useEventsStore from "@/stores/explore.events.store";

// Main Component
export default function ExploreEventsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setLocalFilters, setKeyword } = useEventsStore();

  // ambil semua query params dari URL
  const keyword = searchParams.get("keyword") || "";
  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Events
  const onGetEvents = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("api/explore-events", {
        params: {
          keyword: keyword || undefined,
          location: location || undefined,
          category: category || undefined,
        },
      });
      setEventsData(response?.data?.data || []);
    } catch (error) {
      toast.error("Internal Server Error : Failed to get events!");
    } finally {
      setIsLoading(false);
    }
  };

  // fetch setiap kali query params berubah
  useEffect(() => {
    onGetEvents();
  }, [keyword, location, category]);

  const { itemsPerPage } = useEventsStore();
  const totalPages = Math.ceil(eventsData.length / itemsPerPage);

  // Get current page events
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = eventsData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // update filters → ubah URL query params
  const handleFiltersChange = (newFilters: any) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newFilters.location) params.set("location", newFilters.location);
    else params.delete("location");

    if (newFilters.category) params.set("category", newFilters.category);
    else params.delete("category");

    // keyword tetep dipertahankan
    if (keyword) params.set("keyword", keyword);

    router.push(`/explore-events?${params.toString()}`);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("location");
    params.delete("category");
    params.delete("keyword");
    setLocalFilters({});
    setKeyword("");

    router.push(`/explore-events?${params.toString()}`);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto w-full">
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={{ location, category }}
            onFiltersChange={handleFiltersChange}
            onResetFilters={resetFilters}
          />

          {/* Main Content */}
          <div className="mt-10 flex-1">
            {/* Events Grid */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {currentEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={eventsData.length}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
