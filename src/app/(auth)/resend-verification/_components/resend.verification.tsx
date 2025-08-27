"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Loader, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { ValidationResendVerificationSchema } from "../_schemas/validation.resend.verification.schema";
import axiosInstance from "@/utils/axios.instance";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IResendVerification } from "../_types/resend.verification.type";

export default function ResendVerificationForm() {
  const router = useRouter();

  // Loading state
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle Resend Verification Form Submission
  const onHandleResendVerification = async ({
    email,
  }: Pick<IResendVerification, "email">) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "api/auth/resend-verification",
        {
          email,
        },
      );
      console.log(response);
      toast.success(response?.data?.message || "Verification email sent!");
      setSuccess(true);
    } catch (error) {
      const err = error as AxiosError<{
        error: string;
        message: string;
        details: string;
      }>;
      toast.error(
        err?.response?.data?.details ||
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Failed to send verification email!",
      );
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ValidationResendVerificationSchema,
    onSubmit: async ({ email }) => {
      await onHandleResendVerification({ email });
    },
  });

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
          ></Image>

          {!success ? (
            <>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="mb-2 text-center text-2xl font-bold text-slate-800">
                Resend Verification Email
              </h1>
              <p className="mb-6 text-center text-sm text-gray-600">
                Enter your email address and we'll send you a new verification
                link to activate your account.
              </p>
            </>
          ) : (
            <>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="mb-2 text-center text-2xl font-bold text-slate-800">
                Email Sent Successfully!
              </h1>
              <p className="mb-6 text-center text-sm text-gray-600">
                We've sent a new verification email to{" "}
                <strong>{formik.values.email}</strong>. Please check your inbox
                and click the activation link.
              </p>
            </>
          )}
        </div>

        {!success ? (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* email */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="px-2"
                disabled={loading}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="mt-1 flex items-center text-sm text-red-500">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            {/* submit button with loading */}
            <Button
              type="submit"
              className="w-full bg-[#041846] hover:bg-[#041846]/90"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Verification Email
                </span>
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            {/* Success actions */}
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="flex items-start">
                <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Verification email sent!
                  </p>
                  <p className="mt-1 text-sm text-green-700">
                    The email will expire in 2 hours. If you don't see it, check
                    your spam folder.
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                setSuccess(false);
                formik.resetForm();
              }}
              variant="outline"
              className="w-full"
            >
              Send to Different Email
            </Button>
          </div>
        )}

        {/* Navigation links */}
        <div className="mt-6 space-y-2">
          <p className="text-center text-sm text-slate-600">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign In
            </Link>
          </p>

          <p className="text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Help section */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="text-center">
            <p className="mb-2 text-xs text-gray-500">Still having trouble?</p>
            <Link
              href="/contact-support"
              className="text-xs text-blue-600 hover:underline"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
