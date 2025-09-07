// components/EventMetadata.tsx
import Head from "next/head";
import { Event } from "@/app/(event)/event-details/[title]/_types/event.details.type";
import { useEventMetadata } from "@/app/(event)/event-details/[title]/_hooks/event.details.hook";

interface EventMetadataProps {
  event: Event;
  currentUrl?: string;
  siteName?: string;
}

const EventMetadata: React.FC<EventMetadataProps> = ({
  event,
  currentUrl = "",
  siteName = "Ticketin",
}) => {
  const { metadata, structuredData, shareData } = useEventMetadata({
    event,
    currentUrl,
    siteName,
  });

  if (!metadata || !shareData) return null;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />
      <meta name="author" content={metadata.organizer} />
      <link rel="canonical" href={metadata.url} />

      {/* Viewport and Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={metadata.image} />
      <meta property="og:image:alt" content={`${event.title} event image`} />
      <meta property="og:url" content={metadata.url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="id_ID" />

      {/* Event specific Open Graph */}
      <meta property="event:start_time" content={event.startDate.toString()} />
      <meta property="event:end_time" content={event.endDate.toString()} />
      <meta property="event:location" content={metadata.location} />
      <meta property="event:organizer" content={metadata.organizer} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={metadata.image} />
      <meta name="twitter:image:alt" content={`${event.title} event image`} />
      <meta name="twitter:site" content="@eventbrite" />
      <meta
        name="twitter:creator"
        content={`@${metadata.organizer.replace(/\s+/g, "")}`}
      />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* Event specific meta */}
      <meta name="event:price" content={metadata.price} />
      <meta name="event:currency" content="IDR" />
      <meta name="event:category" content={metadata.category} />

      {/* Language and Region */}
      <meta httpEquiv="content-language" content="id" />
      <meta name="geo.region" content="ID" />
      <meta name="geo.placename" content={event.location} />

      {/* Structured Data JSON-LD */}
      {structuredData.event && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.event),
          }}
        />
      )}

      {/* Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.organization),
        }}
      />

      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.breadcrumb),
        }}
      />

      {/* Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="theme-color" content="#2563eb" />

      {/* Preload critical resources */}
      <link rel="preload" href={metadata.image} as="image" />
    </Head>
  );
};

export default EventMetadata;
