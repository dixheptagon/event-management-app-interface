"use client";

import { FunnelPlus } from "lucide-react";
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
import { set } from "date-fns";
import useEventsStore from "@/stores/explore.events.store";

export const FilterSidebar = ({
  filters,
  onFiltersChange,
  onResetFilters,
}: any) => {
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

  // local state → biar user bisa ketik dulu, baru submit saat klik Apply
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
    onFiltersChange(localFilters); // update ke parent
  };

  return (
    <div className="mt-10 h-fit w-64 rounded-lg bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filter</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetFilters}
          disabled={!isFilterActive}
        >
          Reset
        </Button>
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
          className="w-full bg-orange-500 text-white hover:bg-orange-600"
        >
          <FunnelPlus size={16} className="mr-2" />
          Apply
        </Button>
      </form>
    </div>
  );
};
