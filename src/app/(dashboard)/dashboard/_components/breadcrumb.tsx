// Breadcrumb Component
const Breadcrumb = ({ currentPage }: { currentPage: string }) => {
  return (
    <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Kamu di sini</span>
        <span>/</span>
        <span className="text-blue-600">{currentPage}</span>
      </div>
    </div>
  );
};

export default Breadcrumb;
