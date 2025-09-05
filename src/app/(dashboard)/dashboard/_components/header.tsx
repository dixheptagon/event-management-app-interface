import { Calendar, User } from "lucide-react";

// Header Component
const Header = ({ title = "Dashboard", userName = "Forentino Hary..." }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200">
          <Calendar size={16} />
          Buat Event
        </button>
        <div className="flex items-center gap-2">
          <User size={20} className="text-gray-600" />
          <span className="text-sm text-gray-600">{userName}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
