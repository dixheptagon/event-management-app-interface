import { Compass, Home, Settings, TicketCheck, UserStar } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "My Account",
    url: "/dashboard/my-account",
    icon: Home,
  },
  {
    title: "Explore Events",
    url: "/explore-events",
    icon: Compass,
  },
  {
    title: "My Tickets",
    url: "/dashboard/my-tickets",
    icon: TicketCheck,
  },
  {
    title: "Reviews & Ratings",
    url: "/dashboard/review-rating",
    icon: UserStar,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-[#041846]">
        <div className="flex justify-center p-4">
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
        <SidebarGroup className="text-white">
          <SidebarGroupLabel className="text-md text-white">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
