import { ChevronDown, Filter, MapPin, Search, Tag } from "lucide-react";
import { useState } from "react";

// Filter Component
export const FilterSidebar = ({
  filters,
  onFiltersChange,
  onResetFilters,
}: any) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const locations = [
    "Jakarta",
    "Bandung",
    "Surabaya",
    "Medan",
    "Yogyakarta",
    "Semarang",
    "Malang",
    "Denpasar",
  ];

  const categories = [
    "Concert",
    "Education",
    "Charity",
    "Kids",
    "Conference",
    "Sports",
    "Workshop",
    "Seminar",
  ];

  // Filter locations based on search
  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(filters.locationSearch.toLowerCase()),
  );

  const toggleDropdown = (dropdown: any) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const updateFilter = (key: any, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="mt-10 h-fit w-64 rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filter</h2>
        <button
          onClick={onResetFilters}
          className="text-orange-500 transition-colors hover:text-orange-600"
        >
          <Filter size={18} />
        </button>
      </div>

      <div className="space-y-6">
        {/* Event Online Toggle */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">Event Online</span>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              id="online-toggle"
              checked={filters.isOnline || false}
              onChange={(e) => updateFilter("isOnline", e.target.checked)}
            />
            <label
              htmlFor="online-toggle"
              className={`relative block h-6 w-12 cursor-pointer rounded-full transition-colors ${
                filters.isOnline ? "bg-orange-500" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                  filters.isOnline ? "translate-x-7" : "translate-x-1"
                }`}
              ></span>
            </label>
          </div>
        </div>

        {/* Location Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("location")}
            className="flex w-full items-center justify-between border-b border-gray-200 py-3 font-medium text-gray-700 transition-colors hover:text-gray-900"
          >
            <span>Lokasi</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${openDropdown === "location" ? "rotate-180" : ""}`}
            />
          </button>

          {openDropdown === "location" && (
            <div className="absolute top-full right-0 left-0 z-10 mt-1 rounded-md border border-gray-200 bg-white shadow-lg">
              <div className="border-b border-gray-100 p-3">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search location..."
                    value={filters.locationSearch || ""}
                    onChange={(e) =>
                      updateFilter("locationSearch", e.target.value)
                    }
                    className="w-full rounded-md border border-gray-200 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredLocations.map((location) => (
                  <button
                    key={location}
                    onClick={() => {
                      updateFilter("location", location);
                      setOpenDropdown(null);
                    }}
                    className={`w-full px-4 py-2 text-left transition-colors hover:bg-gray-50 ${
                      filters.location === location
                        ? "bg-orange-50 text-orange-600"
                        : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-2" />
                      {location}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("category")}
            className="flex w-full items-center justify-between border-b border-gray-200 py-3 font-medium text-gray-700 transition-colors hover:text-gray-900"
          >
            <span>Format</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${openDropdown === "category" ? "rotate-180" : ""}`}
            />
          </button>

          {openDropdown === "category" && (
            <div className="absolute top-full right-0 left-0 z-10 mt-1 rounded-md border border-gray-200 bg-white shadow-lg">
              <div className="max-h-48 overflow-y-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      updateFilter("category", category);
                      setOpenDropdown(null);
                    }}
                    className={`w-full px-4 py-2 text-left transition-colors hover:bg-gray-50 ${
                      filters.category === category
                        ? "bg-orange-50 text-orange-600"
                        : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <Tag size={14} className="mr-2" />
                      {category}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Other Filter Options */}
        {["Topik", "Waktu", "Harga"].map((filterName) => (
          <div key={filterName} className="relative">
            <button className="flex w-full items-center justify-between border-b border-gray-200 py-3 font-medium text-gray-700 transition-colors hover:text-gray-900">
              <span>{filterName}</span>
              <ChevronDown size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
