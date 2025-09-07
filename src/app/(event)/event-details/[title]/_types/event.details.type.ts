// types/event.types.ts

export interface TicketType {
  price: number;
  ticketType: string;
  quantity: number;
  description: string;
  name: string;
}

export interface EventMedia {
  url: string;
}

export interface Organizer {
  fullname: string;
}

export interface Event {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
  venue: string;
  description: string;
  category: string;
  eventMedia: EventMedia[];
  ticketTypes: TicketType[];
  organizer: Organizer;
}

export interface EventMetadataProps {
  event: Event;
  currentUrl?: string;
  siteName?: string;
}

// Additional types for metadata generation
export interface GeneratedMetadata {
  title: string;
  description: string;
  image: string;
  url: string;
  startDate: string;
  location: string;
  price: string;
  organizer: string;
  category: string;
  keywords: string;
}

// Social media sharing types
export interface ShareData {
  title: string;
  text: string;
  url: string;
  image?: string;
}

// Structured data types for SEO
export interface EventStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  eventStatus: string;
  eventAttendanceMode: string;
  location: {
    "@type": string;
    name: string;
    address: {
      "@type": string;
      addressLocality: string;
      addressCountry: string;
    };
  };
  image: string[];
  organizer: {
    "@type": string;
    name: string;
  };
  offers: {
    "@type": string;
    price: number;
    priceCurrency: string;
    name: string;
    availability: string;
    url: string;
    validFrom: string;
  }[];
}

export interface OrganizationStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
}

export interface BreadcrumbStructuredData {
  "@context": string;
  "@type": string;
  itemListElement: {
    "@type": string;
    position: number;
    name: string;
    item: string;
  }[];
}
