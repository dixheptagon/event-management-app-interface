"use client";
import { useEffect, useState } from "react";
import { FilterSidebar } from "./filtering";
import { Pagination } from "./pagenation";
import { EventCard } from "./event.card";
import axiosInstance from "@/utils/axios.instance";
import { toast } from "react-toastify";

// Main Component
export default function ExploreEventsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    location: "",
    category: "",
    locationSearch: "",
    isOnline: false,
  });
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  //   Get Events
  const onGetEvents = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("api/explore-events");
      console.log(response);
      setEventsData(response?.data?.data || []);
    } catch (error) {
      toast.error("Internal Server Error : Failed to get events!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onGetEvents();
  }, []);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(eventsData.length / itemsPerPage);

  // Get current page events
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = eventsData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const resetFilters = () => {
    setFilters({
      location: "",
      category: "",
      locationSearch: "",
      isOnline: false,
    });
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto w-full">
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onResetFilters={resetFilters}
          />

          {/* Main Content */}
          <div className="mt-10 flex-1">
            {/* Events Grid */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {eventsData.map((event, index) => (
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
