"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";
import { AlertCircle, Eye, EyeClosed, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { ValidationRegisterSchema } from "../_schemas/validation.register.schema";
import { IRegister } from "../_types/register.type";
import axiosInstance from "@/utils/axios.instance";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export default function RegisterForm() {
  const router = useRouter();

  // Toggle show password
  const [showPassword, setShowPassword] = useState(false);
  const toggleShow = () => setShowPassword((prev) => !prev);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Handle Register Form Submision
  const onHandleRegister = async ({
    fullname,
    email,
    password,
    role,
  }: Pick<IRegister, "fullname" | "email" | "password" | "role">) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("api/auth/register", {
        fullname,
        email,
        password,
        role,
      });
      toast.success(response?.data?.message || "Register berhasil!");
      router.push("/login");
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err?.response?.data?.error || "Register gagal!");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: ValidationRegisterSchema,
    onSubmit: async ({ fullname, email, password, role }) => {
      await onHandleRegister({ fullname, email, password, role });
      formik.resetForm();
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center">
          <Image src="/logo.png" alt="Logo" width={120} height={120}></Image>
          <h1 className="mb-2 text-2xl font-bold text-slate-800">
            Create your TICKETIN.ID® account
          </h1>
          <p className="mb-4 text-sm text-gray-600">
            Join ticketin and never miss your favorite events again!
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* fullname */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <Input
              type="text"
              name="fullname"
              placeholder="Your full name"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-2"
            />
            {formik.errors.fullname && formik.touched.fullname ? (
              <div className="mt-1 flex items-center text-sm text-red-500">
                <AlertCircle className="mr-1 h-4 w-4" />
                {formik.errors.fullname}
              </div>
            ) : null}
          </div>

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
                placeholder="Write your password"
                value={formik.values.password}
                onChange={formik.handleChange}
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

          {/* role */}
          <div>
            <div className="mt-4 flex items-center">
              <label className="mr-5 mb-1 block text-sm font-medium text-slate-700">
                Role
              </label>
              <Select
                value={formik.values.role}
                onValueChange={(value) => formik.setFieldValue("role", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="event_organizer">
                    Event Organizer
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formik.errors.role && formik.touched.role ? (
              <div className="mt-1 flex items-center text-sm text-red-500">
                <AlertCircle className="mr-1 h-4 w-4" />
                {formik.errors.role}
              </div>
            ) : null}
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
                <Loader className="mr-2 animate-spin [animation-delay:-0.5ss]" />
                Loading...
              </span>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
