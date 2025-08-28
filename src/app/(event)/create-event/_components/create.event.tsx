"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Calendar, Save, Eye } from "lucide-react";
import { EventFormValues } from "../_types/types.create.event";
import {
  EVENT_CATEGORIES,
  INITIAL_VALUES,
} from "../_constants/constants.create.event";
import { ValidationCreateEventSchema } from "../_schemas/validation.create.event.schema";
import FormField from "./form.fields";
import TicketTypesSection from "./ticket.types.section";
import ImageUploadField from "./image.upload.field";
import TagsField from "./tags.field";
import EventSummary from "./event.summary";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Main Component
const CreateEventPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: EventFormValues, isDraft = false) => {
    setIsLoading(true);

    try {
      // Transform data for API
      const formData = new FormData();

      // Add basic fields
      Object.entries(values).forEach(([key, value]) => {
        if (key !== "image" && key !== "ticketTypes" && key !== "tags") {
          formData.append(key, String(value));
        }
      });

      // Add image
      if (values.image) {
        formData.append("image", values.image);
      }

      // Add complex fields as JSON
      formData.append("ticketTypes", JSON.stringify(values.ticketTypes));
      formData.append("tags", JSON.stringify(values.tags));
      formData.append("isDraft", String(isDraft));

      // Simulate API call
      console.log("Form submitted:", values);
      console.log("Is draft:", isDraft);

      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert(
        isDraft ? "Event saved as draft!" : "Event published successfully!",
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={ValidationCreateEventSchema}
        onSubmit={(values) => handleSubmit(values, false)}
        enableReinitialize
      >
        {(formikProps) => (
          <Form>
            {/* Header */}
            <div className="border-b border-gray-200 bg-white">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-3 py-6 md:flex-row">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      Create New Event
                    </h1>
                    <p className="mt-2 text-gray-600">
                      Fill in the details to create your event
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => handleSubmit(formikProps.values, true)}
                      disabled={isLoading}
                      className="flex items-center space-x-2 rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Save className="h-4 w-4" />
                      <span>{isLoading ? "Saving..." : "Save Draft"}</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Eye className="h-4 w-4" />
                      <span>
                        {isLoading ? "Publishing..." : "Publish Event"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Main Content */}
                <div className="space-y-8 lg:col-span-2">
                  {/* Basic Information */}
                  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-xl font-semibold text-gray-900">
                      Basic Information
                    </h2>

                    <div className="space-y-6">
                      <FormField
                        label="Event Name"
                        name="name"
                        placeholder="Enter event name"
                        required
                      />

                      <FormField
                        label="Description"
                        name="description"
                        as="textarea"
                        rows={4}
                        placeholder="Describe your event..."
                        required
                      />

                      <FormField
                        label="Category"
                        name="category"
                        as="shadcn-select"
                        required
                      >
                        <option value="">Select a category</option>
                        {EVENT_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </FormField>
                    </div>
                  </div>

                  {/* Date & Location */}
                  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-6 flex items-center text-xl font-semibold text-gray-900">
                      <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                      Date & Location
                    </h2>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormField
                        className="md:col-span-2"
                        label="Date"
                        name="date"
                        type="date"
                        as="shadcn-datepicker"
                        required
                      />

                      <FormField
                        label="Start Time"
                        name="startTime"
                        type="time"
                        required
                      />

                      <FormField
                        label="End Time"
                        name="endTime"
                        type="time"
                        required
                      />

                      <FormField
                        label="Location"
                        name="location"
                        placeholder="City, Province"
                        required
                      />

                      <FormField
                        label="Venue"
                        name="venue"
                        placeholder="Venue name or address"
                        required
                      />

                      <div className="md:col-span-2">
                        <FormField
                          label="Total Capacity"
                          name="capacity"
                          type="number"
                          placeholder="Maximum number of attendees"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ticket Types */}
                  <TicketTypesSection formikProps={formikProps} />
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Image Upload */}
                  <ImageUploadField formikProps={formikProps} />

                  {/* Tags */}
                  <TagsField formikProps={formikProps} />

                  {/* Event Summary */}
                  <EventSummary ticketTypes={formikProps.values.ticketTypes} />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEventPage;
