import { PromotionFormValues } from "./types.promotion";

// Types & Interfaces
export interface TicketType {
  id: string;
  name: string;
  price: number | "";
  quantity: number | "";
  description: string;
  ticketType: "PAID" | "FREE";
}

export interface EventFormValues {
  name: string;
  description: string;
  category: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  location: string;
  venue: string;
  capacity: number | "";
  image: File | null;
  ticketTypes: TicketType[];
  tags: string[];
  promotions: PromotionFormValues[];
}

// Form Components
export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  as?: string;
  rows?: number;
  children?: React.ReactNode;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formatter?: (value: string) => string;
  parser?: (value: string) => string;
}
