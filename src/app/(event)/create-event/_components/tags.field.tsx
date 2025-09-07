import { FormikProps } from "formik";
import { EventFormValues } from "../_types/types.create.event";
import { useState } from "react";
import { Plus } from "lucide-react";

const TagsField: React.FC<{
  formikProps: FormikProps<EventFormValues>;
}> = ({ formikProps }) => {
  const { values, setFieldValue, errors, touched } = formikProps;
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    const trimmedTag = newTag.trim();
    if (
      trimmedTag &&
      !values.tags.includes(trimmedTag) &&
      values.tags.length < 10
    ) {
      setFieldValue("tags", [...values.tags, trimmedTag]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFieldValue(
      "tags",
      values.tags.filter((tag) => tag !== tagToRemove),
    );
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Tags</h2>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTag())
            }
            disabled={values.tags.length >= 10}
          />
          <button
            type="button"
            onClick={addTag}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={values.tags.length >= 10 || !newTag.trim()}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {values.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {values.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 transition-colors hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-500">
          {values.tags.length}/10 tags added
        </p>

        {touched.tags && errors.tags && (
          <p className="text-sm text-red-500">{errors.tags}</p>
        )}
      </div>
    </div>
  );
};

export default TagsField;
