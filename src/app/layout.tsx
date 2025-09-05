import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar/navbar";
import { AuthProvider } from "@/providers/auth.provider";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

export const metadata: Metadata = {
  title: "Ticketin : Event Ticketing Management",
  description:
    "Simplify your event management with Ticketin. Create events, sell tickets, and track attendees all in one platform.",
  keywords: [
    "Ticketin",
    "Event Management",
    "Event Ticketing",
    "Online Ticket Sales",
    "Event Organizer Tools",
    "Manage Attendees",
    "Ticket Platform",
    "Event Dashboard",
  ],
  creator: "Forentino Haryanto",
  publisher: "Forentino Haryanto",
  openGraph: {
    title: "Ticketin : Event Ticketing Management",
    description:
      "Simplify your event management with Ticketin. Create events, sell tickets, and track attendees all in one platform.",
    url: baseUrl,
    siteName: "Ticketin",
    images: [
      {
        url: `https://res.cloudinary.com/dzpcr6tzh/image/upload/v1757056654/ticketin_opengraph_event-management-app_ck5ggp.png`,
        width: 1200,
        height: 630,
        alt: "Ticketin : Event Ticketing Management",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ticketin : Event Ticketing Management",
    description:
      "Manage your events and tickets with ease using Ticketin. Fast, modern, and user-friendly.",
    images: [
      `https://res.cloudinary.com/dzpcr6tzh/image/upload/v1757056654/ticketin_opengraph_event-management-app_ck5ggp.png`,
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <ToastContainer />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
