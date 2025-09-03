// Pagination Component
export const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
}: any) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
      <div className="text-sm text-gray-600">
        Tampil: <span className="font-medium">{itemsPerPage}</span> dari{" "}
        <span className="font-medium">{totalItems}</span>
      </div>

      <div className="flex items-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-8 w-8 rounded-md text-sm font-medium transition-colors ${
              currentPage === page
                ? "bg-orange-500 text-white"
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
