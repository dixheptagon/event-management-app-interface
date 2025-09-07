// hooks/useEventMetadata.ts
import { useMemo } from "react";
import {
  Event,
  GeneratedMetadata,
  EventStructuredData,
  OrganizationStructuredData,
  BreadcrumbStructuredData,
} from "@/app/(event)/event-details/[title]/_types/event.details.type";
import formatDateRange from "@/utils/format.date.range";
import getLowestPriceLabel from "@/utils/getLowestPrice";

interface UseEventMetadataProps {
  event: Event | null;
  siteName?: string;
  currentUrl?: string;
}

interface UseEventMetadataReturn {
  metadata: GeneratedMetadata | null;
  structuredData: {
    event: EventStructuredData | null;
    organization: OrganizationStructuredData;
    breadcrumb: BreadcrumbStructuredData;
  };
  shareData: {
    title: string;
    description: string;
    url: string;
    image: string;
  } | null;
}

export const useEventMetadata = ({
  event,
  siteName = "EventBrite",
  currentUrl = "",
}: UseEventMetadataProps): UseEventMetadataReturn => {
  const metadata = useMemo((): GeneratedMetadata | null => {
    if (!event) return null;

    const title = `${event.title} | ${siteName}`;
    const description =
      event.description?.slice(0, 160) +
      (event.description?.length > 160 ? "..." : "");
    const image = event.eventMedia?.[0]?.url || "/default-event-image.jpg";
    const url =
      currentUrl || (typeof window !== "undefined" ? window.location.href : "");
    const startDate = formatDateRange(
      event.startDate.toString(),
      event.endDate.toString(),
    );
    const location = `${event.venue}, ${event.location}`;
    const price = getLowestPriceLabel(event.ticketTypes ?? []);
    const organizer = event.organizer?.fullname;
    const category = event.category;

    // Generate SEO-friendly keywords
    const keywords = [
      category,
      event.location,
      "event",
      "tickets",
      organizer,
      event.title.split(" ").slice(0, 3).join(" "),
      "buy tickets",
      "event booking",
    ]
      .filter(Boolean)
      .join(", ");

    return {
      title,
      description,
      image,
      url,
      startDate,
      location,
      price,
      organizer,
      category,
      keywords,
    };
  }, [event, siteName, currentUrl]);

  const structuredData = useMemo(() => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

    const eventStructuredData: EventStructuredData | null = event
      ? {
          "@context": "https://schema.org",
          "@type": "Event",
          name: event.title,
          description: event.description,
          startDate: event.startDate,
          endDate: event.endDate,
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: event.venue,
            address: {
              "@type": "PostalAddress",
              addressLocality: event.location,
              addressCountry: "ID",
            },
          },
          image: [metadata?.image || ""],
          organizer: {
            "@type": "Person",
            name: event.organizer?.fullname || "",
          },
          offers:
            event.ticketTypes?.map((ticket) => ({
              "@type": "Offer",
              price: ticket.price,
              priceCurrency: "IDR",
              name: ticket.name,
              availability:
                ticket.quantity > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/SoldOut",
              url: metadata?.url || "",
              validFrom: new Date().toISOString(),
            })) || [],
        }
      : null;

    const organizationStructuredData: OrganizationStructuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteName,
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      sameAs: [
        "https://www.facebook.com/eventbrite",
        "https://www.twitter.com/eventbrite",
        "https://www.instagram.com/eventbrite",
      ],
    };

    const breadcrumbStructuredData: BreadcrumbStructuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Events",
          item: `${baseUrl}/events`,
        },
        ...(event
          ? [
              {
                "@type": "ListItem",
                position: 3,
                name: event.title,
                item: metadata?.url || "",
              },
            ]
          : []),
      ],
    };

    return {
      event: eventStructuredData,
      organization: organizationStructuredData,
      breadcrumb: breadcrumbStructuredData,
    };
  }, [event, metadata, siteName]);

  const shareData = useMemo(() => {
    if (!event || !metadata) return null;

    return {
      title: metadata.title,
      description: metadata.description,
      url: metadata.url,
      image: metadata.image,
    };
  }, [event, metadata]);

  return {
    metadata,
    structuredData,
    shareData,
  };
};
