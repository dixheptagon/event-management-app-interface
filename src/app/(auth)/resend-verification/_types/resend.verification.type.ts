export interface IResendVerification {
  email: string;
}

export interface IResendVerificationResponse {
  status: string;
  message: string;
  data: {
    email: string;
    expiresAt: string;
  };
}
