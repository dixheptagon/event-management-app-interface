export interface ReferralInputProps {
  referralCode: string;
  setReferralCode: (code: string) => void;
  validationStatus: "idle" | "loading" | "success" | "error";
  errorMessage: string;
  onValidate: () => void;
  onInputChange?: (value: string) => void;
}
