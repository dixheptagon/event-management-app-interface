import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useEventsStore from "@/stores/explore.events.store";

// Pagination Component
export const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
}: any) => {
  const { setItemsPerPage } = useEventsStore();

  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3 text-sm text-gray-600">
        Shows:{" "}
        <span className="font-medium">
          <Select
            value={String(itemsPerPage)}
            onValueChange={(value) => setItemsPerPage(Number(value))}
          >
            <SelectTrigger
              id="items-per-page"
              className="h-8 w-18 text-sm focus:ring-1 focus:ring-orange-500"
            >
              <SelectValue placeholder="8" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="16">16</SelectItem>
              <SelectItem value="24">24</SelectItem>
            </SelectContent>
          </Select>
        </span>{" "}
        from <span className="font-medium">{totalItems}</span>
      </div>

      <div className="flex items-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-8 w-8 rounded-md text-sm font-medium transition-colors ${
              currentPage === page
                ? "bg-[#15306d] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}

        {totalPages > 4 && (
          <button className="h-8 w-8 rounded-md bg-gray-100 text-sm font-medium text-gray-600 hover:bg-gray-200">
            →
          </button>
        )}
      </div>
    </div>
  );
};
