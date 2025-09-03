// components/footer.tsx
"use client";

import Link from "next/link";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-[#041846] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Kolom 1: Logo & Deskripsi */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Logo" width={120} height={120} />
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Explore nearby events, buy tickets instantly, and enjoy a hands-on
              experience without the hassle.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Kolom 2: Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/explore-events"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <h3 className="mt-8 mb-4 text-lg font-semibold">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Info Kontak */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <span className="font-medium">Email:</span> support@ticketin.com
              </li>
              <li>
                <span className="font-medium">Phone:</span> +62 812-3456-7890
              </li>
              <li>
                <span className="font-medium">Address:</span> Jakarta, Indonesia
              </li>
            </ul>

            <div className="mt-6">
              <h3 className="mb-4 text-lg font-semibold">Subscribe</h3>
              <form className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none border-none bg-gray-800 px-4 text-white placeholder-gray-400 focus:ring-blue-500"
                />
                <Button
                  type="submit"
                  className="rounded-l-none bg-blue-600 hover:bg-blue-700"
                >
                  Join
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Ticketin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
