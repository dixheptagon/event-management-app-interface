// components/user-menu-drawer.tsx
"use client";

import Link from "next/link";
import useAuthStore from "@/stores/auth.store";
import { Separator } from "@/components/ui/separator";
import { ShieldUser } from "lucide-react";

export default function UserMenuDrawer() {
  const { role } = useAuthStore();
  console.log(role);

  return (
    <div className="mt-6 flex flex-col gap-2 p-4">
      {/* Switch Role */}
      {role === "customer" ? (
        <Link
          href="/" // Ganti dengan URL yang sesuai
          className="flex flex-col gap-3 rounded-md p-2 text-sm font-medium text-blue-600 hover:bg-gray-200 hover:text-blue-700"
        >
          <span className="text-gray-700">Switch Account to </span>
          <div className="flex items-center gap-3">
            <ShieldUser />
            <span className="font-semibold">Event Organizer</span>
          </div>
        </Link>
      ) : (
        <Link
          href="/" // Ganti dengan URL yang sesuai
          className="flex flex-col gap-3 rounded-md p-2 text-sm font-medium text-blue-600 hover:bg-gray-200 hover:text-blue-700"
        >
          <span>Switch Account to </span>
          <div className="flex items-center gap-3">
            <ShieldUser />
            <span className="font-semibold">Customer</span>
          </div>
        </Link>
      )}

      <Separator className="my-2 text-gray-500" />

      {/* Menu Items */}
      {role === "customer" ? (
        <Link
          href="/events"
          className="block rounded-md px-2 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Explore Events
        </Link>
      ) : (
        <Link
          href="/create-event"
          className="block rounded-md px-2 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Create Event
        </Link>
      )}

      <Link
        href="/tickets"
        className="block rounded-md px-2 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200"
      >
        My Ticket
      </Link>
      <Link
        href="/profile/info"
        className="block rounded-md px-2 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200"
      >
        Dashboard
      </Link>
      <Link
        href="/profile/settings"
        className="block rounded-md px-2 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200"
      >
        Settings
      </Link>
    </div>
  );
}
