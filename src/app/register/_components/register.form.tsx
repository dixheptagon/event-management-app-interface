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
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { ValidationRegisterSchema } from "../_schemas/validation.register.schema";

export default function RegisterForm() {
  // Routing
  const router = useRouter();

  // Toggle show password
  const [showPassword, setShowPassword] = useState(false);
  const toggleShow = () => setShowPassword((prev) => !prev);

  // Form Validation
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: ValidationRegisterSchema,
    onSubmit: ({ fullname, email, password, role }) => {
      console.log(fullname, email, password, role);
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
              <div className="text-sm text-red-500">
                {formik.errors.fullname}
              </div>
            ) : null}
          </div>

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
              <div className="text-sm text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>

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
              <div className="text-sm text-red-500">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          {/* Role*/}
          <div>
            <div className="mt-4 flex items-center">
              <label className="mr-5 mb-1 block text-sm font-medium text-slate-700">
                Role
              </label>
              <Select
                value={formik.values.role}
                onValueChange={(value) => formik.setFieldValue("role", value)}
                required
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
              <div className="text-sm text-red-500">{formik.errors.role}</div>
            ) : null}
          </div>

          <Button type="submit" className="w-full bg-[#041846]">
            Sign Up
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
