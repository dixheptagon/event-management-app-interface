"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Compass, Ticket, User, Search } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#041846] text-white">
      <div className="mx-auto !px-6">
        {/* Top Section */}
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Left: Logo + Search */}
          <div className="flex flex-1 items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image src="/logo.png" alt="Logo" width={150} height={150} />
            </Link>

            {/* Search Bar */}
            <div className="max-w-xl flex-1">
              <div className="flex">
                <Input
                  placeholder="Cari event seru di sini"
                  className="rounded-r-none border-none bg-[#15306d] !px-4 text-white placeholder:text-gray-400"
                />
                <Button className="rounded-l-none bg-blue-600 !px-4 hover:bg-blue-700">
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
            <Button
              size="icon"
              variant="outline"
              className="rounded-full border-blue-400 text-blue-400 hover:bg-blue-700 hover:text-white"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Hashtags */}
        <div className="flex gap-4 !pb-2 text-sm text-blue-200">
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
  );
}
