export interface IRegisterInput {
  fullname: string;
  email: string;
  password: string;
  role: string;
  referralCode?: string | null;
  usedReferralCode?: string | null;
}

export interface IRegister extends IRegisterInput {
  id: string;

  referralPoints: number;
  referredBy?: string | null;

  isVerified: boolean;
  verificationToken?: string | null;
  verificationExpiry?: Date | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
