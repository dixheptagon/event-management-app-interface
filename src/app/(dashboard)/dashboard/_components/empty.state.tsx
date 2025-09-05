import { Calendar } from "lucide-react";

// Empty State Component
const EmptyState = ({
  icon: Icon = Calendar,
  message = "Tidak ada data ditemukan",
}) => {
  return (
    <div className="py-12 text-center text-gray-500">
      <Icon size={48} className="mx-auto mb-4 opacity-50" />
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
