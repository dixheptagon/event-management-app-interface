// Types & Interfaces
export interface TicketType {
  id: string;
  name: string;
  price: number | "";
  quantity: number | "";
  description: string;
}

export interface EventFormValues {
  name: string;
  description: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  venue: string;
  capacity: number | "";
  image: File | null;
  ticketTypes: TicketType[];
  tags: string[];
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
}
