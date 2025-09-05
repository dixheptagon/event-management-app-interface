import { Formik, Form, Field, FieldArray, FormikProps } from "formik";
import { EventFormValues } from "../_types/types.create.event";
import { useState } from "react";
import { Image, Trash2, Upload } from "lucide-react";

const ImageUploadField: React.FC<{
  formikProps: FormikProps<EventFormValues>;
}> = ({ formikProps }) => {
  const { values, setFieldValue, errors, touched } = formikProps;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue("image", file);

      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFieldValue("image", null);
    setPreviewUrl(null);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-900">
        <Image className="mr-2 h-5 w-5 text-blue-600" />
        Event Image
      </h2>

      <div className="space-y-4">
        {previewUrl ? (
          <div className="relative">
            <div className="aspect-[21/10] w-full">
              <img
                src={previewUrl}
                alt="Event preview"
                className="h-full w-full rounded-lg object-cover object-center"
              />
            </div>
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 rounded-full bg-red-600 p-1 text-white transition-colors hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label className="flex h-42 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="mb-4 h-8 w-8 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>

              <p className="text-xs text-gray-500">
                PNG, JPG or GIF (MAX. 5MB)
              </p>

              <span className="pt-2 text-xs text-gray-500">
                Ratio 16:9 is recommended
              </span>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        )}

        {touched.image && errors.image && (
          <p className="text-sm text-red-500">{errors.image}</p>
        )}
      </div>
    </div>
  );
};

export default ImageUploadField;
