"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app.sidebar";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { CalendarPlus, Compass, Ticket } from "lucide-react";
import useAuthStore from "@/stores/auth.store";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { role } = useAuthStore();
  const pathname = usePathname();

  // hapus prefix /dashboard
  const cleanPath = pathname.replace(/^\/dashboard/, "");

  const titles: Record<string, string> = {
    "/my-account": "My Account",
    "/my-tickets": "My Tickets",
    "/review-rating": "Review & Rating",
    "/settings": "Settings",
  };

  const currentTitle = titles[cleanPath] || "My Account";

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="min-h-screen w-full">
        <header className="m-2 flex w-full items-center justify-between">
          <div className="flex items-center">
            <SidebarTrigger className="size-10" />
            <Separator
              orientation="vertical"
              className="mr-2 text-black data-[orientation=vertical]:h-4"
            />
            <h2 className="text-center font-medium">{currentTitle}</h2>
          </div>

          <div className="mr-8 flex gap-5">
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
                href="/dashboard/my-tickets"
                className="flex items-center gap-2 text-sm font-medium hover:text-blue-300"
              >
                <Ticket className="h-4 w-4" /> My Ticket
              </Link>
            )}
          </div>
        </header>
        {children}
      </main>
    </SidebarProvider>
  );
}
