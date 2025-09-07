import { EventFormValues } from "../_types/types.create.event";

// Constants
const EVENT_CATEGORIES = [
  "Music & Concerts",
  "Sports & Fitness",
  "Arts & Culture",
  "Food & Drink",
  "Technology",
  "Business",
  "Education",
  "Community",
  "Other",
] as const;

const TICKET_TYPES = ["PAID", "FREE"] as const;

const INITIAL_VALUES: EventFormValues = {
  name: "",
  description: "",
  category: "",
  startDate: new Date(),
  endDate: new Date(),
  startTime: "",
  endTime: "",
  location: "",
  venue: "",
  capacity: "",
  image: null,
  ticketTypes: [
    {
      id: crypto.randomUUID(),
      name: "General Admission",
      price: "",
      quantity: "",
      description: "",
      ticketType: "PAID",
    },
  ],
  tags: [],
  promotions: [],
};

export { EVENT_CATEGORIES, INITIAL_VALUES, TICKET_TYPES };
