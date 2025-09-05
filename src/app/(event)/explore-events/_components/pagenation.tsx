import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Ganti `any` dengan tipe yang jelas
export const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange, // tambah prop ini
}: {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (limit: number) => void;
}) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
      {/* Show per page */}
      <div className="flex items-center gap-3 text-sm text-gray-600">
        Show{" "}
        <Select
          value={String(itemsPerPage)}
          onValueChange={(value) => onItemsPerPageChange(Number(value))}
        >
          <SelectTrigger className="h-8 w-20 text-sm focus:ring-1 focus:ring-orange-500">
            <SelectValue placeholder="8" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="24">24</SelectItem>
          </SelectContent>
        </Select>{" "}
        of <span className="font-medium">{totalItems}</span>
      </div>

      {/* Page buttons */}
      <div className="flex items-center space-x-2">
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(
          (page) => (
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
          ),
        )}

        {totalPages > 5 && currentPage < totalPages && (
          <>
            {currentPage < totalPages - 1 && (
              <span className="px-1 text-gray-500">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="h-8 w-8 rounded-md bg-gray-100 text-sm font-medium text-gray-600 hover:bg-gray-200"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
