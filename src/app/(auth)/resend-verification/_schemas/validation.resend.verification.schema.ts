import * as yup from "yup";

export const ValidationResendVerificationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email address is required"),
});
