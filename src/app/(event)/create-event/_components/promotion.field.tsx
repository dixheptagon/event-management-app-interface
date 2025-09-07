"use client";

import React, { useState } from "react";
import { Field, FieldArray, getIn } from "formik"; // ⚠️ Import getIn
import {
  Plus,
  Trash2,
  Tag,
  Percent,
  DollarSign,
  Calendar,
  Users,
} from "lucide-react";
import {
  FieldErrorProps,
  PromotionsFieldProps,
} from "../_types/types.promotion";

// Types based on your Prisma schema
const PROMO_TYPES = [
  { value: "EARLY_BIRD", label: "Early Bird" },
  { value: "FLASH_SALE", label: "Flash Sale" },
  { value: "BUNDLE", label: "Bundle Discount" },
  { value: "REFERRAL", label: "Referral" },
  { value: "VOUCHER", label: "Voucher Code" },
];

const DISCOUNT_TYPES = [
  { value: "PERCENTAGE", label: "Percentage (%)" },
  { value: "FIXED_AMOUNT", label: "Fixed Amount (Rp)" },
];

// ⚠️ Helper function untuk display error
const FieldError: React.FC<FieldErrorProps> = ({ name, formikProps }) => {
  const error = getIn(formikProps.errors, name);
  const touched = getIn(formikProps.touched, name);

  if (!error || !touched) return null;

  // Extract all error messages
  const getErrorMessages = (err: string | string[] | object) => {
    if (typeof err === "string") return [err];
    if (Array.isArray(err)) {
      return err.flatMap((item) =>
        typeof item === "object" ? Object.values(item).filter(Boolean) : [item],
      );
    }
    if (typeof err === "object") {
      return Object.values(err).filter(Boolean);
    }
    return [String(err)];
  };

  const messages = getErrorMessages(error);

  return (
    <div className="mt-1 text-sm text-red-500">
      {messages.map((msg, idx) => (
        <div key={idx}>• {msg}</div>
      ))}
    </div>
  );
};

const PromotionsField = ({ formikProps }: PromotionsFieldProps) => {
  const [expandedPromo, setExpandedPromo] = useState(null);

  const togglePromo = (index: any) => {
    setExpandedPromo(expandedPromo === index ? null : index);
  };

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value || 0);
  };

  const parseCurrency = (value: string) => {
    return value.replace(/\D/g, ""); // ambil angka doang
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center text-xl font-semibold text-gray-900">
          <Tag className="mr-2 h-5 w-5 text-purple-600" />
          Event Promotions (Optional)
        </h2>
      </div>

      <FieldArray name="promotions">
        {({ push, remove }) => (
          <div className="space-y-4">
            {/* ⚠️ Display array-level error */}
            <FieldError name="promotions" formikProps={formikProps} />

            {formikProps.values.promotions?.map(
              (promotion: any, index: any) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg border border-gray-200"
                >
                  {/* Promotion Header */}
                  <div
                    className="flex cursor-pointer items-center justify-between bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                    onClick={() => togglePromo(index)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Tag className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-gray-900">
                          {PROMO_TYPES.find(
                            (t) => t.value === promotion.promoType,
                          )?.label || "New Promotion"}
                        </span>
                      </div>
                      {promotion.code && (
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                          {promotion.code}
                        </span>
                      )}
                      {promotion.discountValue && (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {promotion.discountType === "PERCENTAGE"
                            ? `${promotion.discountValue}%`
                            : formatCurrency(promotion.discountValue)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        Quota: {promotion.quota || 0}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          remove(index);
                        }}
                        className="text-red-500 transition-colors hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Promotion Details */}
                  {expandedPromo === index && (
                    <div className="space-y-6 bg-white p-6">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Promo Type */}
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Promotion Type *
                          </label>
                          <Field
                            as="select"
                            name={`promotions.${index}.promoType`}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="">Select promotion type</option>
                            {PROMO_TYPES.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </Field>
                          {/* ⚠️ Error display untuk promoType */}
                          <FieldError
                            name={`promotions.${index}.promoType`}
                            formikProps={formikProps}
                          />
                        </div>

                        {/* Discount Type */}
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Discount Type *
                          </label>
                          <Field
                            as="select"
                            name={`promotions.${index}.discountType`}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="">Select discount type</option>
                            {DISCOUNT_TYPES.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </Field>
                          {/* ⚠️ Error display untuk discountType */}
                          <FieldError
                            name={`promotions.${index}.discountType`}
                            formikProps={formikProps}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Discount Value */}
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            <div className="flex items-center space-x-2">
                              {formikProps.values.promotions[index]
                                ?.discountType === "PERCENTAGE" ? (
                                <Percent className="h-4 w-4 text-green-600" />
                              ) : (
                                <DollarSign className="h-4 w-4 text-green-600" />
                              )}
                              <span>Discount Value *</span>
                            </div>
                          </label>
                          <Field name={`promotions.${index}.discountValue`}>
                            {({ field, form }: any) => {
                              const rawValue = field.value || "";
                              const isPercentage =
                                formikProps.values.promotions[index]
                                  ?.discountType === "PERCENTAGE";

                              return (
                                <input
                                  {...field}
                                  type="text"
                                  inputMode="numeric"
                                  placeholder={
                                    isPercentage
                                      ? "e.g., 10 (for 10%)"
                                      : "e.g., 50000 (for Rp 50,000)"
                                  }
                                  value={
                                    isPercentage
                                      ? rawValue
                                      : formatCurrency(rawValue)
                                  }
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    form.setFieldValue(
                                      field.name,
                                      isPercentage
                                        ? val.replace(/\D/g, "")
                                        : parseCurrency(val),
                                    );
                                  }}
                                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                                />
                              );
                            }}
                          </Field>
                          {/* ⚠️ Error display untuk discountValue */}
                          <FieldError
                            name={`promotions.${index}.discountValue`}
                            formikProps={formikProps}
                          />
                        </div>

                        {/* Quota */}
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-blue-600" />
                              <span>Usage Quota *</span>
                            </div>
                          </label>
                          <Field
                            type="number"
                            name={`promotions.${index}.quota`}
                            placeholder="e.g., 100"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                          />
                          {/* ⚠️ Error display untuk quota */}
                          <FieldError
                            name={`promotions.${index}.quota`}
                            formikProps={formikProps}
                          />
                        </div>
                      </div>

                      {/* Promo Code (Optional) */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Promo Code (Optional)
                        </label>
                        <Field
                          type="text"
                          name={`promotions.${index}.code`}
                          placeholder="e.g., EARLYBIRD10, FLASHSALE2024"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                        />
                        <FieldError
                          name={`promotions.${index}.code`}
                          formikProps={formikProps}
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          Leave empty for automatic promotions. Add code for
                          manual vouchers.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Min Purchase Amount */}
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Minimum Purchase (Optional)
                          </label>
                          <Field name={`promotions.${index}.minPurchaseAmount`}>
                            {({ field, form }: any) => {
                              const rawValue = field.value || "";
                              return (
                                <input
                                  {...field}
                                  type="text"
                                  inputMode="numeric"
                                  placeholder="e.g., 100000 (Rp 100,000)"
                                  value={formatCurrency(rawValue)}
                                  onChange={(e) => {
                                    form.setFieldValue(
                                      field.name,
                                      parseCurrency(e.target.value),
                                    );
                                  }}
                                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                                />
                              );
                            }}
                          </Field>
                          <FieldError
                            name={`promotions.${index}.minPurchaseAmount`}
                            formikProps={formikProps}
                          />
                        </div>

                        {/* Max Discount Amount */}
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Maximum Discount (Optional)
                          </label>
                          <Field name={`promotions.${index}.maxDiscountAmount`}>
                            {({ field, form }: any) => {
                              const rawValue = field.value || "";
                              return (
                                <input
                                  {...field}
                                  type="text"
                                  inputMode="numeric"
                                  placeholder="e.g., 100000 (Rp 100,000)"
                                  value={formatCurrency(rawValue)}
                                  onChange={(e) => {
                                    form.setFieldValue(
                                      field.name,
                                      parseCurrency(e.target.value),
                                    );
                                  }}
                                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                                />
                              );
                            }}
                          </Field>
                          <FieldError
                            name={`promotions.${index}.maxDiscountAmount`}
                            formikProps={formikProps}
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            Prevents excessive discounts for percentage-based
                            promos
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Start Date */}
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              <span>Start Date *</span>
                            </div>
                          </label>
                          <Field
                            type="datetime-local"
                            name={`promotions.${index}.startDate`}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                          />
                          {/* ⚠️ Error display untuk startDate */}
                          <FieldError
                            name={`promotions.${index}.startDate`}
                            formikProps={formikProps}
                          />
                        </div>

                        {/* End Date */}
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-red-600" />
                              <span>End Date *</span>
                            </div>
                          </label>
                          <Field
                            type="datetime-local"
                            name={`promotions.${index}.endDate`}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                          />
                          {/* ⚠️ Error display untuk endDate */}
                          <FieldError
                            name={`promotions.${index}.endDate`}
                            formikProps={formikProps}
                          />
                        </div>
                      </div>

                      {/* Is Active Toggle */}
                      <div className="flex items-center space-x-3">
                        <Field
                          type="checkbox"
                          name={`promotions.${index}.isActive`}
                          id={`active-${index}`}
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-purple-600 focus:ring-purple-500"
                        />
                        <label
                          htmlFor={`active-${index}`}
                          className="text-sm font-medium text-gray-700"
                        >
                          Active promotion (can be used immediately)
                        </label>
                      </div>

                      {/* Validation Messages - Custom Logic */}
                      {formikProps.values.promotions[index]?.discountType ===
                        "PERCENTAGE" &&
                        parseInt(
                          formikProps.values.promotions[index]?.discountValue,
                        ) > 100 && (
                          <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                            <p className="text-sm text-red-800">
                              ⚠️ Percentage discount cannot exceed 100%
                            </p>
                          </div>
                        )}

                      {formikProps.values.promotions[index]?.discountType ===
                        "FIXED_AMOUNT" &&
                        parseInt(
                          formikProps.values.promotions[index]?.discountValue,
                        ) > 0 &&
                        parseInt(
                          formikProps.values.promotions[index]?.discountValue,
                        ) < 1000 && (
                          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                            <p className="text-sm text-yellow-800">
                              💡 Consider setting minimum discount to Rp 1,000
                            </p>
                          </div>
                        )}

                      {formikProps.values.promotions[index]?.startDate &&
                        formikProps.values.promotions[index]?.endDate &&
                        new Date(
                          formikProps.values.promotions[index]?.startDate,
                        ) >=
                          new Date(
                            formikProps.values.promotions[index]?.endDate,
                          ) && (
                          <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                            <p className="text-sm text-red-800">
                              ⚠️ End date must be after start date
                            </p>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              ),
            )}

            {/* Add New Promotion Button */}
            <button
              type="button"
              onClick={() =>
                push({
                  promoType: "",
                  discountType: "",
                  discountValue: "",
                  code: "",
                  minPurchaseAmount: "",
                  maxDiscountAmount: "",
                  quota: "",
                  startDate: "",
                  endDate: "",
                  isActive: true,
                })
              }
              className="flex w-full items-center justify-center space-x-2 rounded-lg border-2 border-dashed border-purple-300 px-4 py-3 text-purple-600 transition-colors hover:border-purple-400 hover:bg-purple-50"
            >
              <Plus className="h-5 w-5" />
              <span>Add Promotion</span>
            </button>

            {formikProps.values.promotions?.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                <Tag className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                <p className="text-sm">No promotions added yet</p>
                <p className="text-xs">
                  Click &quot;Add Promotion&quot; to create event discounts and
                  coupons
                </p>
              </div>
            )}
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default PromotionsField;
