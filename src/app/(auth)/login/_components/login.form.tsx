"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { AlertCircle, Eye, EyeClosed, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { ValidationLoginSchema } from "../_schemas/validation.login.schema";
import { ILogin } from "../_types/login.type";
import axiosInstance from "@/utils/axios.instance";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import useAuthStore from "@/stores/auth.store";

export default function LoginForm() {
  // use Global State
  const { setAuth } = useAuthStore();

  // Router
  const router = useRouter();

  // Toggle show password
  const [showPassword, setShowPassword] = useState(false);
  const toggleShow = () => setShowPassword((prev) => !prev);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Handle Login Form Submission
  const onHandleLogin = async ({
    email,
    password,
  }: Pick<ILogin, "email" | "password">) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("api/auth/login", {
        email,
        password,
      });

      // Save token to global state
      setAuth({
        token: response?.data?.data?.token,
        fullname: response?.data?.data?.user?.fullname,
        role: response?.data?.data?.user?.role,
      });

      console.log(response);
      toast.success(response?.data?.message || "Login successful!", {
        onClose: () => router.push("/"),
        autoClose: 3000, // toast ilang otomatis setelah 3 detik
      });
    } catch (error) {
      const err = error as AxiosError<{ error: string; message: string }>;
      toast.error(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Login failed!",
      );
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: ValidationLoginSchema,
    onSubmit: async ({ email, password }) => {
      await onHandleLogin({ email, password });
      formik.resetForm();
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center">
          <Image src="/logo.png" alt="Logo" width={120} height={120}></Image>
          <h1 className="mb-2 text-2xl font-bold text-slate-800">
            Welcome back to TICKETIN.ID®
          </h1>
          <p className="mb-4 text-sm text-gray-600">
            Sign in to your account and continue your event journey!
          </p>
          <p className="mb-4 rounded bg-yellow-100 p-2 text-sm text-gray-600">
            <strong>⏰ Important:</strong> You must be verified before logging
            in. Please check your email for verification instructions, email
            verification will expire in <strong>2 hours</strong>.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <Input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-2"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="mt-1 flex items-center text-sm text-red-500">
                {" "}
                <AlertCircle className="mr-1 h-4 w-4" />
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          {/* password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="px-2 pr-10"
              />
              <Button
                type="button"
                onClick={toggleShow}
                size="icon"
                variant="ghost"
                className="absolute top-1/2 right-0 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </Button>
            </div>
            {formik.errors.password && formik.touched.password ? (
              <div className="mt-1 flex items-center text-sm text-red-500">
                <AlertCircle className="mr-1 h-4 w-4" />
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          {/* Forgot password link */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          {/* submit button with loading */}
          <Button
            type="submit"
            className="w-full bg-[#041846]"
            disabled={loading}
          >
            {loading ? (
              // Animated loading spinner
              <span className="flex items-center justify-center">
                <Loader className="mr-2 animate-spin [animation-delay:-0.5s]" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Additional links */}
        <div className="mt-6 text-center">
          <Link
            href="/resend-verification"
            className="text-xs text-gray-500 hover:text-gray-700 hover:underline"
          >
            Didn't receive verification email? Click here
          </Link>
        </div>
      </div>
    </div>
  );
}
