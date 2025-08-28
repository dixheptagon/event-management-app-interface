import * as Yup from "yup";
import { EVENT_CATEGORIES } from "../_constants/constants.create.event";

// Yup Validation Schema
export const ValidationCreateEventSchema = Yup.object().shape({
  name: Yup.string()
    .required("Event name is required")
    .min(3, "Event name must be at least 3 characters")
    .max(100, "Event name must be less than 100 characters"),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),

  category: Yup.string()
    .required("Category is required")
    .oneOf(EVENT_CATEGORIES, "Please select a valid category"),

  date: Yup.date()
    .required("Date is required")
    .min(new Date(), "Event date cannot be in the past"),

  time: Yup.string()
    .required("Time is required")
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Please enter a valid time"),

  location: Yup.string()
    .required("Location is required")
    .min(2, "Location must be at least 2 characters"),

  venue: Yup.string()
    .required("Venue is required")
    .min(2, "Venue must be at least 2 characters"),

  capacity: Yup.number()
    .positive("Capacity must be a positive number")
    .integer("Capacity must be a whole number")
    .min(1, "Capacity must be at least 1")
    .max(1000000, "Capacity seems too large"),

  ticketTypes: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().required(),
        name: Yup.string()
          .required("Ticket name is required")
          .min(2, "Ticket name must be at least 2 characters"),
        price: Yup.number()
          .required("Price is required")
          .min(0, "Price cannot be negative")
          .max(100000000, "Price seems too high"),
        quantity: Yup.number()
          .required("Quantity is required")
          .positive("Quantity must be positive")
          .integer("Quantity must be a whole number")
          .min(1, "Quantity must be at least 1"),
        description: Yup.string().max(
          500,
          "Description must be less than 500 characters",
        ),
      }),
    )
    .min(1, "At least one ticket type is required")
    .required(),

  tags: Yup.array().of(Yup.string()).max(10, "Maximum 10 tags allowed"),

  image: Yup.mixed()
    .nullable()
    .test("fileSize", "File size too large (max 5MB)", (value) => {
      if (!value) return true;
      return (value as File).size <= 5 * 1024 * 1024; // 5MB
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return true;
      return ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
        (value as File).type,
      );
    }),
});
