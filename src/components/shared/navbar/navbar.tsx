"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Compass, Ticket, User, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import LoginSignUpDrawer from "./login.signup.drawer";
import { usePathname } from "next/navigation";

// const AuthRouter = [
//   "/login",
//   "/register",
//   "/resend-verification",
//   "/verification-success",
// ];
export default function Navbar() {
  const pathName = usePathname();

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // if (AuthRouter.includes(pathName)) {
  //   return null;
  // }
  return (
    <>
      <nav className="relative z-20 w-full bg-[#041846] text-white">
        <div className="relative mx-auto px-6">
          {/* Top Section */}
          <div className="flex h-16 items-center justify-between gap-6">
            {/* Left: Logo + Search */}
            <div className="flex flex-1 items-center gap-6">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image src="/logo.png" alt="Logo" width={120} height={120} />
              </Link>

              {/* Search Bar */}
              <div className="max-w-xl flex-1">
                <div className="flex">
                  <Input
                    placeholder="Cari event seru di sini"
                    className="rounded-r-none border-none bg-[#15306d] px-4 placeholder:text-gray-400"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  <Button className="rounded-l-none bg-blue-600 px-4 hover:bg-blue-700">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Menu */}
            <div className="flex items-center gap-6">
              <div className="hidden gap-6 hover:text-blue-500 md:flex">
                <Link
                  href="/events"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Compass className="h-4 w-4" /> Explore Events
                </Link>
              </div>
              <div className="hidden gap-6 hover:text-blue-500 md:flex">
                <Link
                  href="/tickets"
                  className="flex items-center gap-2 text-sm font-medium hover:text-blue-300"
                >
                  <Ticket className="h-4 w-4" /> My Ticket
                </Link>
              </div>
              <LoginSignUpDrawer />
            </div>
          </div>

          {/* Hashtags */}
          <div className="flex gap-4 pb-2 text-sm text-blue-200">
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
        </div>
      </nav>

      {/* Backdrop */}
      {isSearchFocused && (
        <div
          className="fixed inset-0 z-10 bg-black/60"
          onClick={() => setIsSearchFocused(false)}
        />
      )}
    </>
  );
}
