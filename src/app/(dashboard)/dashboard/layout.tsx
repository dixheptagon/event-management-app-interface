"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app.sidebar";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { CalendarPlus, Compass, Ticket, X, MoreHorizontal } from "lucide-react";
import useAuthStore from "@/stores/auth.store";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { role } = useAuthStore();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // hapus prefix /dashboard
  const cleanPath = pathname.replace(/^\/dashboard/, "");

  const titles: Record<string, string> = {
    "/my-account": "My Account",
    "/my-tickets": "My Tickets",
    "/review-rating": "Review & Rating",
    "/settings": "Settings",
  };

  const currentTitle = titles[cleanPath] || "My Account";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navigationLinks = [
    {
      href: "/explore-events",
      icon: Compass,
      label: "Explore Events",
      showForAll: true,
    },
    {
      href:
        role === "EVENT_ORGANIZER" ? "/create-event" : "/dashboard/my-tickets",
      icon: role === "EVENT_ORGANIZER" ? CalendarPlus : Ticket,
      label: role === "EVENT_ORGANIZER" ? "Create Event" : "My Tickets",
      showForAll: true,
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="min-h-screen w-full bg-gray-50/50">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between px-3 py-2 sm:px-4 lg:px-6">
            {/* Left Section */}
            <div className="flex min-w-0 flex-1 items-center">
              <SidebarTrigger className="mr-2 size-8 flex-shrink-0 sm:size-10" />

              {/* Separator - Hidden on mobile */}
              <Separator
                orientation="vertical"
                className="mr-3 hidden text-gray-300 data-[orientation=vertical]:h-4 sm:block"
              />

              {/* Page Title */}
              <h2 className="truncate text-sm font-medium text-gray-900 sm:text-base lg:text-lg">
                {currentTitle}
              </h2>
            </div>

            {/* Right Section - Desktop */}
            <nav className="hidden flex-shrink-0 items-center gap-4 md:flex lg:gap-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  <link.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="hidden lg:inline">{link.label}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="rounded-lg p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <MoreHorizontal className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="border-t border-gray-200 bg-white shadow-lg md:hidden">
              <nav className="space-y-1 px-4 py-3">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <link.icon className="h-5 w-5 flex-shrink-0" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </header>

        {/* Main Content */}
        <div className="flex-1">
          {/* Content Container */}
          <div className="w-full max-w-full">
            {/* Mobile Title Bar - Only show on very small screens */}
            <div className="border-b border-gray-200 bg-white px-4 py-3 sm:hidden">
              <h1 className="text-lg font-semibold text-gray-900">
                {currentTitle}
              </h1>
            </div>

            {/* Page Content */}
            <div className="min-h-[calc(100vh-4rem)] p-3 sm:p-4 lg:p-6">
              <div className="mx-auto w-full max-w-7xl">{children}</div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/20 md:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
      </main>
    </SidebarProvider>
  );
}
