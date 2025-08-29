// hooks/useReferralValidation.ts
import { useState } from "react";
import axiosInstance from "@/utils/axios.instance";
import { AxiosError } from "axios";

type ValidationStatus = "idle" | "loading" | "success" | "error";

interface UseReferralValidationReturn {
  referralCode: string;
  setReferralCode: (code: string) => void;
  validationStatus: ValidationStatus;
  errorMessage: string;
  validateReferral: () => Promise<void>;
  resetValidation: () => void;
}

export const useReferralValidation = (): UseReferralValidationReturn => {
  const [referralCode, setReferralCode] = useState("");
  const [validationStatus, setValidationStatus] =
    useState<ValidationStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateReferral = async () => {
    if (!referralCode.trim()) {
      setValidationStatus("error");
      setErrorMessage("Please enter a referral code");
      return;
    }

    setValidationStatus("loading");
    setErrorMessage("");

    try {
      const response = await axiosInstance.get(
        `/api/referral/validate/${referralCode}`,
      );

      if (response.data.success) {
        setValidationStatus("success");
      } else {
        setValidationStatus("error");
        setErrorMessage(response.data.message || "Invalid referral code");
      }
    } catch (error) {
      const err = error as AxiosError<{ error: string; message: string }>;
      setValidationStatus("error");
      setErrorMessage(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Failed to validate referral code",
      );
    }
  };

  const resetValidation = () => {
    setValidationStatus("idle");
    setErrorMessage("");
  };

  return {
    referralCode,
    setReferralCode,
    validationStatus,
    errorMessage,
    validateReferral,
    resetValidation,
  };
};
