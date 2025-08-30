"use client";

import useAuthStore from "@/stores/auth.store";
import axiosInstance from "@/utils/axios.instance";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { token } = useAuthStore();
  const { setAuth, clearAuth } = useAuthStore();

  const sessionLogin = async () => {
    try {
      const res = await axiosInstance.get("/api/auth/session-login", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setAuth({
        token: res?.data?.data?.token,
        fullname: res?.data?.data?.user?.fullname,
        role: res?.data?.data?.user?.role,
      });
    } catch (error) {
      toast.error("Email not found, please login again!");
      clearAuth();
      router.replace("/login");
    }
  };

  useEffect(() => {
    if (token) sessionLogin();
  }, [token]);

  return <>{children}</>;
};
