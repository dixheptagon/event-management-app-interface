"use client";

import { FunnelPlus, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import useEventsStore from "@/stores/explore.events.store";

export const FilterSidebar = ({
  filters,
  onFiltersChange,
  onResetFilters,
}: any) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = [
    "All Events",
    "Music & Concerts",
    "Sports & Fitness",
    "Arts & Culture",
    "Food & Drink",
    "Technology",
    "Business",
    "Education",
    "Community",
    "Other",
  ];

  const { setLocalFilters, localFilters, keyword }: any = useEventsStore();

  const updateFilter = (key: string, value: string) => {
    setLocalFilters({
      ...localFilters,
      [key]: value,
    });
  };

  const isFilterActive = Boolean(
    localFilters.location || localFilters.category || keyword,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFiltersChange(localFilters);
    setIsMobileFilterOpen(false); // Close mobile modal after applying
  };

  const handleReset = () => {
    onResetFilters();
    setIsMobileFilterOpen(false); // Close mobile modal after reset
  };

  // Filter content component (reusable for both desktop and mobile)
  const FilterContent = () => (
    <>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filter</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={!isFilterActive}
          >
            Reset
          </Button>
          {/* Close button for mobile */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileFilterOpen(false)}
            className="md:hidden"
          >
            <X size={16} />
          </Button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location Filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Location
          </label>
          <Input
            type="text"
            placeholder="Search location..."
            value={localFilters.location || ""}
            onChange={(e) => updateFilter("location", e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Category
          </label>
          <Select
            value={localFilters.category || ""}
            onValueChange={(val) => updateFilter("category", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Apply button */}
        <Button
          type="submit"
          className="w-full bg-[#15306d] text-white hover:bg-[#15306d]/90"
        >
          <FunnelPlus size={16} className="mr-2" />
          Apply
        </Button>
      </form>
    </>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden">
        <Button
          onClick={() => setIsMobileFilterOpen(true)}
          variant="outline"
          className="flex w-full items-center gap-2"
        >
          <Filter size={16} />
          Filter
          {isFilterActive && (
            <span className="ml-1 h-2 w-2 rounded-full bg-[#15306d]" />
          )}
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <div className="mt-10 hidden h-fit w-64 rounded-lg bg-white p-6 shadow-sm md:block">
        <FilterContent />
      </div>

      {/* Mobile Modal Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Modal */}
          <div className="fixed inset-x-0 bottom-0 z-10 rounded-t-lg bg-white p-6 shadow-xl">
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
};
