"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Compass, Ticket, User, Search, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import UserMenuNavbar from "./navbar.items";
import useEventsStore from "@/stores/explore.events.store";

export default function Navbar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const keyword = useEventsStore((state) => state.keyword);
  const setKeyword = useEventsStore((state) => state.setKeyword);

  // State for styling
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (keyword.trim()) {
      router.push(`/explore-events?keyword=${encodeURIComponent(keyword)}`);
      setIsMenuOpen(false); // close menu kalau dari mobile
    }
  };

  return (
    <>
      <nav className="relative z-30 w-full bg-[#041846] text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Section */}
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo (Always visible) */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={100}
                  height={40}
                  priority
                />
              </Link>
            </div>

            {/* Desktop Search Bar (Only on md+) */}
            <div className="hidden max-w-xl flex-1 md:block">
              <form onSubmit={handleSubmit} className="flex">
                <Input
                  placeholder="Search fun events here..."
                  className="rounded-r-none border-none bg-[#15306d] px-4 placeholder:text-gray-400"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmit(e);
                      setIsSearchFocused(false);
                    }
                  }}
                />
                <Button
                  type="submit"
                  className="rounded-l-none bg-blue-600 hover:bg-blue-700"
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </form>
            </div>

            {/* Right Section: Desktop Menu */}
            <UserMenuNavbar />

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar (Visible when menu is open or always on focus) */}
          <div className="md:hidden">
            {isMenuOpen && (
              <form onSubmit={handleSubmit} className="mt-2 mb-4 flex gap-2">
                <Input
                  placeholder="Cari event..."
                  className="flex-1 rounded-r-none border-none bg-[#15306d] px-4 placeholder:text-gray-400"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <Button
                  type="submit"
                  className="rounded-l-none bg-blue-600 hover:bg-blue-700"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>

          {/* Hashtags - Responsive Wrap */}
          <div className="flex flex-wrap gap-3 pb-4 text-sm text-blue-200 md:pb-2">
            <Link href="#" className="hover:text-white">
              #Promo_Ticketin
            </Link>
            <Link href="#" className="hover:text-white">
              #MadeWithTicketin
            </Link>
            <Link href="#" className="hover:text-white">
              #Ticketin_Promo
            </Link>
            <Link href="#" className="hover:text-white">
              #TicketinLive
            </Link>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="space-y-4 pb-4 md:hidden">
              <Link
                href="/explore-events"
                className="flex items-center gap-2 text-sm font-medium hover:text-blue-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Compass className="h-4 w-4" /> Explore Events
              </Link>
              <Link
                href="/tickets"
                className="flex items-center gap-2 text-sm font-medium hover:text-blue-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Ticket className="h-4 w-4" /> My Ticket
              </Link>
              <div onClick={() => setIsMenuOpen(false)}></div>
            </div>
          )}
        </div>
      </nav>

      {/* Backdrop for Search Focus */}
      {isSearchFocused && (
        <div
          className="fixed inset-0 z-20 bg-black/60"
          onClick={() => setIsSearchFocused(false)}
        />
      )}

      {/* Backdrop for Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
