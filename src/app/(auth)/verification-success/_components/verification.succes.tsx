// pages/verify-email/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Loader } from "lucide-react";
import axiosInstance from "@/utils/axios.instance";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export default function VerifyEmailPage() {
  const router = useRouter();

  // Get the verification token from the URL
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      verifyEmail(token);
      console.log(token);
    } else {
      setError("Invalid verification link");
      setLoading(false);
    }
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    try {
      console.log(">>>");
      const response = await axiosInstance.get(
        `api/auth/verify-email?token=${verificationToken}`,
      );
      console.log(response);
      setSuccess(true);
      toast.success(response?.data?.message || "Verification successful!", {
        onClose: () => router.push("/login"),
        autoClose: 3000,
      });

      //
    } catch (error) {
      const err = error as AxiosError<{
        error: string;
        message: string;
        details: string;
      }>;
      const errorMessage =
        err?.response?.data?.details ||
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Verification failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="mb-4"
          />

          {loading && (
            <>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Loader className="h-8 w-8 animate-spin text-blue-600" />
              </div>
              <h1 className="mb-2 text-center text-2xl font-bold text-slate-800">
                Verifying Your Email
              </h1>
              <p className="mb-6 text-center text-sm text-gray-600">
                Please wait while we verify your email address...
              </p>
            </>
          )}

          {success && !loading && (
            <>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="mb-2 text-center text-2xl font-bold text-slate-800">
                Email Verified Successfully!
              </h1>
              <p className="mb-6 text-center text-sm text-gray-600">
                Your account has been activated. You can now sign in and start
                using TICKETIN.ID®
              </p>

              <Button
                onClick={() => router.push("/login")}
                className="w-full bg-[#041846] hover:bg-[#041846]/90"
              >
                Continue to Sign In
              </Button>
            </>
          )}

          {error && !loading && (
            <>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="mb-2 text-center text-2xl font-bold text-slate-800">
                Verification Failed
              </h1>
              <p className="mb-6 text-center text-sm text-gray-600">{error}</p>

              <div className="flex w-full flex-col space-y-3">
                <Link href="/resend-verification">
                  <Button className="w-full bg-[#041846] hover:bg-[#041846]/90">
                    Request New Verification Email
                  </Button>
                </Link>

                <Link href="/register">
                  <Button variant="outline" className="w-full">
                    Create New Account
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
