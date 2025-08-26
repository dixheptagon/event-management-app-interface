export interface IRegister {
  id: string;
  fullname: string;
  email: string;
  password: string;
  role: string; // "customer" | "admin" | dsb, sesuai enum lo
  referralCode?: string | null;
  points: number;
  isVerified: boolean;
  verificationToken?: string | null;
  verificationExpiry?: Date | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
