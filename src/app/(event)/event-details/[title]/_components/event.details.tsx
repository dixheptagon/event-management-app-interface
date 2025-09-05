"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Calendar, Users, Share2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import axiosInstance from "@/utils/axios.instance";
import { toast } from "react-toastify";
import formatDateRange from "@/utils/format.date.range";
import { formatTimeRange } from "@/utils/format.time.range";
import { formatPriceIdr } from "@/utils/format.price.idr";
import getLowestPriceLabel from "@/utils/getLowestPrice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import EventMetadata from "../_metadata/event.metadata";
import {
  ContentSkeleton,
  HeroSkeleton,
  SidebarSkeleton,
  TicketSkeleton,
} from "./event.skeleton";

type Event = {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
  venue: string;
  description: string;
  category: string;
  eventMedia: { url: string }[];
  ticketTypes: {
    price: number;
    ticketType: string;
    quantity: number;
    description: string;
    name: string;
  }[];
  organizer: { fullname: string };
};

const EventDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [isLoading, setIsLoading] = useState(true);

  const pathName = usePathname();
  const eventId = pathName.split("%20").pop();
  const [eventDetails, setEventDetails] = useState<Event | null>(null);

  const onGetEventDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`api/event-details/${eventId}`);

      setEventDetails(response?.data?.data?.json);
    } catch (error) {
      toast.error("Internal Server Error : Failed to get event details!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  useEffect(() => {
    onGetEventDetails();
  }, [eventId]);

  const tabs = [
    { id: "description", label: "Description" },
    { id: "ticket", label: "Tickets" },
    { id: "privacyPolicy", label: "Privacy Policy" },
  ];

  return (
    <>
      {/* Dynamic Metadata Component */}
      {eventDetails && (
        <EventMetadata
          event={eventDetails}
          currentUrl={typeof window !== "undefined" ? window.location.href : ""}
          siteName="EventBrite"
        />
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Background */}
        {isLoading ? (
          <HeroSkeleton />
        ) : (
          <div className="relative h-120 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 md:h-80">
            <div className="absolute inset-0 bg-black/40" />

            {/* Event Logo/Image - positioned on the right */}
            <div className="absolute bottom-2 px-7 md:top-20 md:right-2">
              <div className="md flex h-48 w-72 items-center justify-center rounded-lg md:h-64 md:w-128">
                <img
                  src={eventDetails?.eventMedia[0]?.url}
                  alt={eventDetails?.title}
                  className="rounded-lg object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Event Info */}
            <div className="relative container mx-auto px-10 pt-8">
              <div className="max-w-2xl text-white">
                <h1 className="mb-2 text-3xl font-bold">
                  {eventDetails?.title}
                </h1>

                <div className="mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-gray-200">
                    {eventDetails?.venue}, {eventDetails?.location}
                  </span>
                </div>

                <div className="mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-gray-200">
                    <span>
                      {formatDateRange(
                        eventDetails?.startDate.toString() ?? "",
                        eventDetails?.endDate.toString() ?? "",
                      )}
                    </span>
                    ,{" "}
                    {formatTimeRange(
                      eventDetails?.startDate.toString() ?? "",
                      eventDetails?.endDate.toString() ?? "",
                    )}
                  </span>
                </div>

                <div className="mb-6 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="text-gray-200">
                    {eventDetails?.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sticky Navigation Tabs */}
        <div className="sticky top-0 z-10 border-b bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="scrollbar-hide flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`border-b-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors sm:px-6 sm:py-4 sm:text-base ${
                      activeTab === tab.id
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                    disabled={isLoading}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Price and CTA - Hidden on mobile */}
              <div className="hidden items-center gap-4 lg:flex">
                {isLoading ? (
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <Skeleton className="mb-1 h-4 w-24" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-10 w-24" />
                  </div>
                ) : (
                  <>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        Price start from
                      </div>
                      <div className="text-xl font-bold">
                        {getLowestPriceLabel(eventDetails?.ticketTypes ?? [])}
                      </div>
                    </div>
                    <Button
                      onClick={() => setActiveTab("ticket")}
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Find Ticket
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Left Content */}
            <div className="order-2 lg:order-1 lg:col-span-2">
              {isLoading ? (
                <>
                  {activeTab === "description" && <ContentSkeleton />}
                  {activeTab === "ticket" && <TicketSkeleton />}
                  {activeTab === "privacyPolicy" && <ContentSkeleton />}
                </>
              ) : (
                <>
                  {activeTab === "description" && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="prose max-w-none space-y-5">
                        <h2 className="text-xl font-bold sm:text-2xl">
                          Description
                        </h2>
                        <p className="text-base leading-relaxed whitespace-pre-line sm:text-lg">
                          {eventDetails?.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "ticket" && (
                    <div className="space-y-4 sm:space-y-6">
                      <h2 className="flex items-center gap-2 text-xl font-bold sm:text-2xl">
                        <span>🎫</span> Tickets
                      </h2>

                      {eventDetails?.ticketTypes.map((session, index) => (
                        <Card key={index} className="p-4 sm:p-6">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex-1">
                              <h3 className="mb-1 text-base font-semibold sm:text-lg">
                                {session.name}
                              </h3>
                              <div className="mb-2 flex items-center gap-4 text-xl font-semibold text-black">
                                <div className="flex items-center gap-1">
                                  {formatPriceIdr(session.price)}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600">
                                {session.description}
                              </p>
                              <p className="mt-1 text-xs text-gray-500">
                                {session.quantity > 0
                                  ? `${session.quantity} tickets available`
                                  : "Sold out"}
                              </p>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                variant="default"
                                className="w-full sm:w-auto"
                                disabled={session.quantity === 0}
                              >
                                {session.quantity > 0
                                  ? "Buy Ticket"
                                  : "Sold Out"}
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {activeTab === "privacyPolicy" && (
                    <div className="space-y-4 sm:space-y-6">
                      <h2 className="text-xl font-bold sm:text-2xl">
                        Privacy Policy
                      </h2>
                      <div className="prose max-w-none">
                        <p className="text-sm text-gray-600 sm:text-base">
                          The terms and conditions for this event will be listed
                          in the event description by the organizer. Please see
                          the description for complete information on the
                          applicable terms and conditions.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="order-1 space-y-4 sm:space-y-6 lg:order-2">
              {isLoading ? (
                <SidebarSkeleton />
              ) : (
                <>
                  {/* Mobile CTA Card - Only visible on mobile */}
                  <div className="lg:hidden">
                    <Card className="border-blue-200 bg-blue-50 p-4">
                      <div className="text-center">
                        <div className="mb-1 text-sm text-gray-600">
                          Price start from
                        </div>
                        <div className="mb-3 text-2xl font-bold text-blue-600">
                          {getLowestPriceLabel(eventDetails?.ticketTypes ?? [])}
                        </div>
                        <Button
                          onClick={() => setActiveTab("ticket")}
                          size="lg"
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          Find Ticket
                        </Button>
                      </div>
                    </Card>
                  </div>

                  {/* Event Summary Card */}
                  <Card className="p-4 sm:p-6">
                    <h3 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">
                      {eventDetails?.title}
                    </h3>

                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500" />
                        <span className="text-sm">
                          {eventDetails?.venue}, {eventDetails?.location}
                        </span>
                      </div>

                      <div className="flex items-start gap-2 sm:gap-3">
                        <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500" />
                        <span className="text-sm">
                          <span>
                            {formatDateRange(
                              eventDetails?.startDate.toString() ?? "",
                              eventDetails?.endDate.toString() ?? "",
                            )}
                          </span>
                          ,{" "}
                          {formatTimeRange(
                            eventDetails?.startDate.toString() ?? "",
                            eventDetails?.endDate.toString() ?? "",
                          )}
                        </span>
                      </div>

                      <div className="flex items-start gap-2 sm:gap-3">
                        <Users className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500" />
                        <span className="text-sm">
                          {eventDetails?.category}
                        </span>
                      </div>
                    </div>

                    <Separator className="my-3 sm:my-4" />

                    <div className="flex items-center gap-2 text-sm">
                      <span>Organized by</span>
                      <Badge variant="secondary">
                        {eventDetails?.organizer.fullname}
                      </Badge>
                    </div>
                  </Card>

                  {/* Share Event */}
                  <Card className="p-4 sm:p-6">
                    <h2 className="mb-3 font-semibold sm:mb-4">
                      Share This Event
                    </h2>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="flex-1">
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto">
                          <div className="flex gap-3">
                            <FacebookShareButton
                              url={
                                typeof window !== "undefined"
                                  ? window.location.href
                                  : ""
                              }
                              hashtag={eventDetails?.title}
                            >
                              <FacebookIcon size={40} round />
                            </FacebookShareButton>

                            <TwitterShareButton
                              url={
                                typeof window !== "undefined"
                                  ? window.location.href
                                  : ""
                              }
                              title={eventDetails?.title}
                            >
                              <TwitterIcon size={40} round />
                            </TwitterShareButton>

                            <WhatsappShareButton
                              url={
                                typeof window !== "undefined"
                                  ? window.location.href
                                  : ""
                              }
                              title={eventDetails?.title}
                            >
                              <WhatsappIcon size={40} round />
                            </WhatsappShareButton>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={handleCopyLink}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailsPage;
