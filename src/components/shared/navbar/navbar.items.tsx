// components/user-menu-drawer.tsx
"use client";

import Link from "next/link";
import useAuthStore from "@/stores/auth.store";
import { CalendarPlus, Compass, ShieldUser, Ticket } from "lucide-react";
import LoginSignUpDrawer from "./login.signup.drawer";

export default function UserMenuNavbar() {
  const { role } = useAuthStore();

  return (
    <div className="hidden items-center gap-6 md:flex">
      <Link
        href="/explore-events"
        className="flex items-center gap-2 text-sm font-medium hover:text-blue-300"
      >
        <Compass className="h-4 w-4" /> Explore Events
      </Link>

      {role === "EVENT_ORGANIZER" ? (
        <Link
          href="/create-event"
          className="flex items-center gap-2 text-sm font-medium hover:text-blue-300"
        >
          <CalendarPlus className="h-4 w-4" /> Create Event
        </Link>
      ) : (
        <Link
          href="/tickets"
          className="flex items-center gap-2 text-sm font-medium hover:text-blue-300"
        >
          <Ticket className="h-4 w-4" /> My Ticket
        </Link>
      )}

      <LoginSignUpDrawer />
    </div>
  );
}
