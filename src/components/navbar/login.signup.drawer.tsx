"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { User, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginSignUpDrawer() {
  return (
    <Sheet>
      {/* Trigger di Navbar */}
      <SheetTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 rounded-xl !p-2 hover:bg-blue-800">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full border-blue-400 text-blue-400"
          >
            <User className="h-5 w-5" />
          </Button>
          <p>Login / Register</p>
        </div>
      </SheetTrigger>

      {/* Drawer Content */}
      <SheetContent side="right" className="w-[340px] sm:w-[380px]">
        <SheetHeader>
          <SheetTitle className="!p-4 text-lg font-bold text-gray-800">
            Log in / Register
          </SheetTitle>
        </SheetHeader>

        <SheetClose asChild>
          <Button className="absolute top-4 right-4 rounded-full !p-2 hover:bg-gray-300">
            <X className="!h-5 !w-5" />
          </Button>
        </SheetClose>

        <div className="mt-6 flex flex-col gap-6 !rounded-2xl !p-4">
          <div className="!mb-6 rounded-xl bg-gray-100 !p-4">
            <Image
              src="/navbar/auth.svg" // contoh image lokal (lo bisa pakai image dari public folder)
              alt="Login icons"
              width={250}
              height={125}
              className="mx-auto mb-3"
            />
            <p className="!mb-2 text-sm font-semibold text-gray-700">
              🎟️ Never miss the best events around you!
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
              <li>🎤 Welcome to Ticketin </li>
              <li>📅 Discover events and shows near you.</li>
              <li>✨ Book your ticket in seconds. </li>
              <li>🎉 enjoy the experience!</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <Link href="/login">
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
              >
                Register
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
