// components/form-field.tsx
import { Field } from "formik";
import { FormFieldProps } from "../_types/types.create.event";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  as = "input",
  rows,
  children,
  className = "",
  onValueChange,
  formatter, // <--- tambahan
  parser, // <--- tambahan
}) => (
  <Field name={name}>
    {({ field, meta, form }: any) => {
      const error = meta.touched && meta.error;

      const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        let rawValue = e.target.value;

        if (parser) {
          rawValue = parser(rawValue); // parsing ke angka mentah
        }

        form.setFieldValue(name, rawValue);

        if (onValueChange) {
          onValueChange(rawValue);
        }
      };

      return (
        <div className={className}>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>

          {/* === shadcn Datepicker === */}
          {as === "shadcn-datepicker" ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start px-4 py-6 text-left font-normal",
                    !field.value && "text-muted-foreground",
                    error && "border-red-500",
                  )}
                >
                  <span>
                    {field.value
                      ? format(new Date(field.value), "PPP") // example: "Sep 1, 2025"
                      : "Pick a date"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => {
                    // Simpan sebagai ISO string (default)
                    form.setFieldValue(name, date?.toISOString());
                  }}
                />
              </PopoverContent>
            </Popover>
          ) : as === "shadcn-select" ? (
            // === shadcn Select ===
            <Select
              name={field.name}
              value={field.value}
              onValueChange={(value) => {
                // Update the form field value
                form.setFieldValue(field.name, value);

                // forward to the parent component
                if (onValueChange) {
                  onValueChange(value);
                }
              }}
            >
              <SelectTrigger
                className={`w-full px-4 py-6 ${
                  error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>{children}</SelectContent>
            </Select>
          ) : as === "select" ? (
            <select
              {...field}
              className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            >
              {children}
            </select>
          ) : as === "textarea" ? (
            <textarea
              {...field}
              placeholder={placeholder}
              rows={rows}
              className={`w-full resize-none rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
          ) : (
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              value={formatter ? formatter(field.value) : field.value || ""}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}

          {error && <p className="mt-1 text-sm text-red-500">{meta.error}</p>}
        </div>
      );
    }}
  </Field>
);

export default FormField;
