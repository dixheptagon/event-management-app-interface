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

const INITIAL_VALUES: EventFormValues = {
  name: "",
  description: "",
  category: "",
  date: "",
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
    },
  ],
  tags: [],
};

export { EVENT_CATEGORIES, INITIAL_VALUES };
