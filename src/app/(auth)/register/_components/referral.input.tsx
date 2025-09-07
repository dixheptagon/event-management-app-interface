// components/ReferralInput.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader, Check, X } from "lucide-react";
import { ReferralInputProps } from "../_types/referral.input.type";

export default function ReferralInput({
  referralCode,
  setReferralCode,
  validationStatus,
  errorMessage,
  onValidate,
  onInputChange,
}: ReferralInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setReferralCode(value);

    // Reset validation status when user types
    if (onInputChange) {
      onInputChange(value);
    }
  };

  const renderButtonContent = () => {
    switch (validationStatus) {
      case "loading":
        return (
          <>
            <Loader className="h-4 w-4 animate-spin" />
            <span className="ml-2">Checking...</span>
          </>
        );
      case "success":
        return (
          <>
            <Check className="h-4 w-4" />
            <span className="ml-2">Valid</span>
          </>
        );
      case "error":
        return (
          <>
            <X className="h-4 w-4" />
            <span className="ml-2">Invalid</span>
          </>
        );
      default:
        return (
          <>
            <Search className="h-4 w-4" />
            <span className="ml-2">Verify</span>
          </>
        );
    }
  };

  const getButtonVariant = () => {
    switch (validationStatus) {
      case "success":
        return "default";
      case "error":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getInputBorderClass = () => {
    switch (validationStatus) {
      case "success":
        return "border-green-500 focus:ring-green-500";
      case "error":
        return "border-red-500 focus:ring-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="mb-1 block text-sm font-medium text-slate-700">
        Referral Code (Optional)
      </label>
      <div className="flex gap-2">
        <Input
          type="text"
          name="referralCode"
          placeholder="Enter referral code"
          value={referralCode}
          onChange={handleInputChange}
          className={`flex-1 px-2 ${getInputBorderClass()}`}
          disabled={validationStatus === "loading"}
        />
        <Button
          type="button"
          onClick={onValidate}
          disabled={validationStatus === "loading" || !referralCode.trim()}
          variant={getButtonVariant()}
          className="min-w-[120px]"
        >
          {renderButtonContent()}
        </Button>
      </div>

      {/* Success Message */}
      {validationStatus === "success" && (
        <p className="flex items-center text-sm text-green-600">
          <Check className="mr-1 h-4 w-4" />
          Referral code applied successfully!
        </p>
      )}

      {/* Error Message */}
      {validationStatus === "error" && errorMessage && (
        <p className="flex items-center text-sm text-red-500">
          <X className="mr-1 h-4 w-4" />
          {errorMessage}
        </p>
      )}
    </div>
  );
}
