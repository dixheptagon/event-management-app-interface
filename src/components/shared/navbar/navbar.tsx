"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Compass, Ticket, User, Search, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import LoginSignUpDrawer from "./login.signup.drawer";
import { usePathname } from "next/navigation";
import UserMenuNavbar from "./navbar.items";

export default function Navbar() {
  const pathname = usePathname();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <>
      <nav className="relative z-20 w-full bg-[#041846] text-white">
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (search.trim()) {
                    window.location.href = `/explore-events?q=${encodeURIComponent(search)}`;
                  }
                }}
                className="flex"
              >
                <Input
                  placeholder="Cari event seru di sini"
                  className="rounded-r-none border-none bg-[#15306d] px-4 placeholder:text-gray-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
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
              <div className="mt-2 mb-4 flex gap-2">
                <Input
                  placeholder="Cari event..."
                  className="flex-1 rounded-r-none border-none bg-[#15306d] px-4 placeholder:text-gray-400"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Hashtags - Responsive Wrap */}
          <div className="flex flex-wrap gap-3 pb-4 text-sm text-blue-200 md:pb-2">
            <Link href="#" className="hover:text-white">
              #Promo_Indodana
            </Link>
            <Link href="#" className="hover:text-white">
              #LOKETScreen
            </Link>
            <Link href="#" className="hover:text-white">
              #LOKET_Promo
            </Link>
            <Link href="#" className="hover:text-white">
              #LoketAttraction
            </Link>
          </div>

          {/* Mobile Menu Dropdown */}
          <div className="md:hidden">
            {isMenuOpen && (
              <div className="mt-2 mb-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (search.trim()) {
                      window.location.href = `/explore-events?q=${encodeURIComponent(search)}`;
                      setIsMenuOpen(false); // tutup menu setelah search
                    }
                  }}
                  className="flex gap-2"
                >
                  <Input
                    placeholder="Cari event..."
                    className="flex-1 rounded-r-none border-none bg-[#15306d] px-4 placeholder:text-gray-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Backdrop for Search Focus */}
      {isSearchFocused && (
        <div
          className="fixed inset-0 z-10 bg-black/60"
          onClick={() => setIsSearchFocused(false)}
        />
      )}

      {/* Backdrop for Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/60 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
