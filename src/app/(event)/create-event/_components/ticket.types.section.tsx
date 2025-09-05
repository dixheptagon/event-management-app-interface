import { Formik, Form, Field, FieldArray, FormikProps } from "formik";
import { EventFormValues } from "../_types/types.create.event";
import { Plus, Tag, Trash2 } from "lucide-react";
import FormField from "./form.fields";
import { TICKET_TYPES } from "../_constants/constants.create.event";
import { SelectItem } from "@/components/ui/select";

const TicketTypesSection: React.FC<{
  formikProps: FormikProps<EventFormValues>;
}> = ({ formikProps }) => {
  const { values, errors, touched } = formikProps;

  return (
    <FieldArray name="ticketTypes">
      {({ push, remove }) => (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center text-xl font-semibold text-gray-900">
              <Tag className="mr-2 h-5 w-5 text-blue-600" />
              Ticket Types
            </h2>
            <button
              type="button"
              onClick={() =>
                push({
                  id: crypto.randomUUID(),
                  name: "",
                  price: "",
                  quantity: "",
                  description: "",
                  ticketType: "PAID", // default
                })
              }
              className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Ticket Type</span>
            </button>
          </div>

          <div className="space-y-6">
            {values.ticketTypes.map((ticket, index) => (
              <div
                key={ticket.id}
                className="rounded-lg border border-gray-200 p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">
                    Ticket Type {index + 1}
                  </h3>
                  {values.ticketTypes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-600 transition-colors hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <FormField
                    label="Ticket Name"
                    name={`ticketTypes.${index}.name`}
                    placeholder="e.g., VIP, General Admission"
                    required
                  />

                  {/* Ticket Type: Free / Paid */}
                  <FormField
                    label="Ticket Type"
                    as="shadcn-select"
                    name={`ticketTypes.${index}.ticketType`}
                    value={ticket.ticketType}
                    onValueChange={(value) => {
                      const fieldName = `ticketTypes.${index}.ticketType`;
                      formikProps.setFieldValue(fieldName, value);

                      // Kalau ganti ke free, clear price
                      if (value === "FREE") {
                        formikProps.setFieldValue(
                          `ticketTypes.${index}.price`,
                          "",
                        );
                      }
                    }}
                  >
                    <option value="">Select a ticket type</option>
                    {TICKET_TYPES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </FormField>

                  {/* Price (tampilkan hanya jika paid) */}
                  {values.ticketTypes[index]?.ticketType === "PAID" && (
                    <FormField
                      label="Price (IDR)"
                      name={`ticketTypes.${index}.price`}
                      type="text"
                      placeholder="0"
                      required
                      formatter={(val) =>
                        val
                          ? new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                            }).format(Number(val))
                          : ""
                      }
                      parser={(val) => val.replace(/\D/g, "")}
                    />
                  )}

                  <FormField
                    label="Quantity"
                    name={`ticketTypes.${index}.quantity`}
                    type="number"
                    placeholder="Available tickets"
                    required
                  />
                </div>

                <FormField
                  label="Description"
                  name={`ticketTypes.${index}.description`}
                  as="textarea"
                  rows={2}
                  placeholder="What's included in this ticket type?"
                />
              </div>
            ))}
          </div>

          {/* Display array-level errors */}
          {typeof errors.ticketTypes === "string" && touched.ticketTypes && (
            <p className="mt-2 text-sm text-red-500">{errors.ticketTypes}</p>
          )}
        </div>
      )}
    </FieldArray>
  );
};

export default TicketTypesSection;
