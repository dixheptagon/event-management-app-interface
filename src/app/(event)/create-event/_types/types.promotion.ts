import { EventFormValues } from "./types.create.event";

export interface PromotionFormValues {
  id?: string;
  promoType: "EARLY_BIRD" | "FLASH_SALE" | "BUNDLE" | "REFERRAL" | "VOUCHER";
  discountType: "PERCENTAGE" | "FIXED_AMOUNT";
  discountValue: string;
  code?: string;
  minPurchaseAmount?: number;
  maxDiscountAmount?: number;
  quota: number;
  usedQuota?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface EventFormValuesWithPromotions extends EventFormValues {
  promotions: PromotionFormValues[];
}

// Database model interface (sesuai Prisma schema)
export interface PromotionModel {
  id: bigint;
  eventId: bigint | null;
  promoType: "EARLY_BIRD" | "FLASH_SALE" | "BUNDLE" | "REFERRAL" | "VOUCHER";
  discountType: "PERCENTAGE" | "FIXED_AMOUNT";
  discountValue: number;
  code: string | null;
  minPurchaseAmount: number | null;
  maxDiscountAmount: number | null;
  quota: number;
  usedQuota: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// Props interfaces untuk components
export interface PromotionsFieldProps {
  formikProps: {
    values: EventFormValuesWithPromotions;
    setFieldValue: (field: string, value: any) => void;
    errors?: any;
    touched?: any;
  };
}

export interface FieldErrorProps extends PromotionsFieldProps {
  name: string;
}
