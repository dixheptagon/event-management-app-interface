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
import useAuthStore from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import UserMenuDrawer from "./drawer.items";

export default function LoginSignUpDrawer() {
  const { fullname, clearAuth } = useAuthStore();
  const router = useRouter();

  const firstName = fullname ? fullname.split(" ")[0] : "Login / Register";

  // Handler logout dengan redirect
  const handleLogout = () => {
    clearAuth();
    router.push("/"); // Redirect ke home setelah logout
  };

  return (
    <Sheet>
      {/* Trigger di Navbar */}
      <SheetTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 rounded-xl p-2 hover:bg-blue-800">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full border-blue-400 text-blue-400 hover:bg-blue-100"
          >
            <User className="h-5 w-5" />
          </Button>
          <span className="hidden text-sm font-medium md:inline">
            {firstName}
          </span>
        </div>
      </SheetTrigger>

      {/* Drawer Content */}
      <SheetContent
        side="right"
        className="w-[90%] max-w-sm rounded-l-xl bg-white p-0 sm:w-[340px] sm:max-w-md"
      >
        {/* Header */}
        <SheetHeader className="relative border-b border-gray-200 bg-blue-50 p-4">
          <SheetTitle className="text-lg font-bold text-gray-800">
            {fullname ? `Hi, ${firstName}` : "Welcome to Ticketin"}
          </SheetTitle>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 rounded-full text-gray-600 hover:bg-gray-300 hover:text-gray-800"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </SheetHeader>

        {/* Body */}

        <div className="flex-1 overflow-y-auto p-4">
          {fullname ? (
            <div>
              <UserMenuDrawer />
            </div>
          ) : (
            <div className="rounded-xl bg-blue-50 p-4 text-center">
              <Image
                src="/navbar/auth.svg"
                alt="Login icons"
                width={250}
                height={125}
                className="mx-auto mb-3 max-w-full"
                style={{ height: "auto" }}
                priority
              />
              <p className="mb-3 text-sm font-semibold text-gray-700">
                🎟️ Never miss the best events around you!
              </p>
              <ul className="list-inside list-disc space-y-1 text-left text-xs text-gray-600 sm:text-sm">
                <li>🎤 Welcome to Ticketin</li>
                <li>📅 Discover events and shows near you.</li>
                <li>✨ Book your ticket in seconds.</li>
                <li>🎉 Enjoy the experience!</li>
              </ul>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            {fullname ? (
              <SheetClose asChild>
                <Button
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </SheetClose>
            ) : (
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
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
