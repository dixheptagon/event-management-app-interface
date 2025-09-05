import {
  Calendar,
  Compass,
  Info,
  MoreHorizontal,
  Navigation,
  Settings,
  Ticket,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Sidebar Component
export const Sidebar = ({ activeSection, setActiveSection }: any) => {
  return (
    <div className="flex w-64 flex-col bg-[#041846] text-white">
      {/* Header */}
      <div className="border-b border-slate-700 p-6">
        <Link href="/" className="flex-shrink-0">
          <Image src="/logo.png" alt="Logo" width={100} height={40} priority />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <button
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-slate-700`}
          >
            <Link href="/explore-events" className="flex items-center gap-3">
              <Compass size={20} />
              Explore Events
            </Link>
          </button>

          <button
            onClick={() => setActiveSection("tiket-saya")}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
              activeSection === "tiket-saya"
                ? "bg-blue-600"
                : "hover:bg-slate-700"
            }`}
          >
            <Ticket size={20} />
            Tiket Saya
          </button>

          <button
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-slate-700`}
          >
            <Link
              href="/dashboard/reviews&ratings"
              className="flex items-center gap-3"
            >
              <Compass size={20} />
              Reviews & Ratings
            </Link>
          </button>
        </div>

        <div className="mt-8">
          <h3 className="mb-2 text-sm text-slate-400">Akun</h3>
          <div className="space-y-2">
            <button
              onClick={() => setActiveSection("informasi-dasar")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                activeSection === "informasi-dasar"
                  ? "bg-blue-600"
                  : "hover:bg-slate-700"
              }`}
            >
              <Info size={20} />
              Informasi Dasar
            </button>
            <button
              onClick={() => setActiveSection("pengaturan")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                activeSection === "pengaturan"
                  ? "bg-blue-600"
                  : "hover:bg-slate-700"
              }`}
            >
              <Settings size={20} />
              Pengaturan
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-2 text-sm text-slate-400">Mode User</h3>
          <button
            onClick={() => setActiveSection("event-creator")}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
              activeSection === "event-creator"
                ? "bg-blue-600"
                : "hover:bg-slate-700"
            }`}
          >
            <User size={20} />
            Beralih Ke Event Creator
          </button>
        </div>
      </nav>

      {/* Bottom Menu */}
      <div className="border-t border-slate-700 p-4">
        <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Ticketin. All rights reserved.
        </p>
      </div>
    </div>
  );
};
