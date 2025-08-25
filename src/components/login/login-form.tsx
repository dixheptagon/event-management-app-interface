"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import { Eye, EyeClosed } from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle show password
  const toggleShow = () => setShowPassword((prev) => !prev);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up data:", form);
    // TODO: connect to API
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200">
      <div className="w-full max-w-md rounded-2xl bg-white !p-6 shadow-lg">
        <div className="flex flex-col items-center">
          <Image src="/logo.png" alt="Logo" width={120} height={120}></Image>
          <h1 className="!mb-2 text-2xl font-bold text-slate-800">
            Create your TICKETIN.ID® account
          </h1>
          <p className="!mb-6 text-sm text-gray-600">
            Join ticketin and never miss your favorite events again!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="!mb-1 block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <Input
              type="text"
              name="fullname"
              placeholder="John Doe"
              value={form.fullname}
              onChange={handleChange}
              required
              className="!px-2"
            />
          </div>

          <div>
            <label className="!mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <Input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="!px-2"
            />
          </div>

          <div>
            <label className="!mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Write your password"
              value={form.password}
              onChange={handleChange}
              required
              className="!px-2"
            />
            <Button
              type="button"
              onClick={toggleShow}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeClosed /> : <Eye />}
            </Button>
          </div>

          <Button type="submit" className="!mt-4 w-full">
            Sign Up
          </Button>
        </form>

        <p className="!mt-4 text-center text-sm text-slate-600">
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
