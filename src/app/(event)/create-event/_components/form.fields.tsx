import { Formik, Form, Field, FieldArray, FormikProps } from "formik";
import { FormFieldProps } from "../_types/types.create.event";

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
}) => (
  <Field name={name}>
    {({ field, meta, form }: any) => (
      <div className={className}>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {as === "select" ? (
          <select
            {...field}
            className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
              meta.touched && meta.error ? "border-red-500" : "border-gray-300"
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
              meta.touched && meta.error ? "border-red-500" : "border-gray-300"
            }`}
          />
        ) : (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
              meta.touched && meta.error ? "border-red-500" : "border-gray-300"
            }`}
          />
        )}

        {meta.touched && meta.error && (
          <p className="mt-1 text-sm text-red-500">{meta.error}</p>
        )}
      </div>
    )}
  </Field>
);

export default FormField;
