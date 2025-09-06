"use client";

import useAuthStore from "@/stores/auth.store";
import axiosInstance from "@/utils/axios.instance";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type TUserData = {
  fullname: string;
  email: string;
  referralCode: string;
  referralPoints: number;
};

export default function Home() {
  const { token } = useAuthStore();
  const [userData, setUserData] = useState(null as TUserData | null);
  const router = useRouter();
  const onGetUserPersonalInfo = async () => {
    try {
      const response = await axiosInstance.get("api/dashboard/my-account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      setUserData(response?.data?.data);
    } catch (error) {
      toast.error("Failed to get user personal info, please try again later!");
    }
  };

  useEffect(() => {
    // if (!token) {
    //   toast.error("You are not logged in, Please login first!");
    //   router.push("/login");
    // }

    if (token) onGetUserPersonalInfo();
  }, [token]);

  return (
    <div className="mx-5">
      <h1 className="text-2xl font-medium">Personal Information</h1>

      <hr className="my-4 border-t-2 border-gray-300" />

      {/* User Basic Info */}
      <div className="mx-10 flex flex-col items-center gap-4 md:flex-row">
        {/* Mobile */}
        <CircleUserRound
          size={100}
          className="block text-[#041846] md:hidden"
        />

        {/* Desktop */}
        <CircleUserRound
          size={100}
          className="hidden text-[#041846] md:block"
        />
        <div className="flex flex-col gap-3 md:flex-row md:gap-25 md:px-5">
          <div>
            <h2 className="text-md font-medium">User Name</h2>
            <h2 className="text-lg font-medium">{userData?.fullname || "-"}</h2>
          </div>
          <div className="md:ml-10">
            <p className="text-gray-500">Email</p>
            <p className="text-gray-500">{userData?.email || "-"}</p>
          </div>
        </div>
      </div>

      <hr className="my-6 border-t-2 border-gray-300" />

      {/* Referral Info */}
      <div className="mx-10">
        <h2 className="mb-3 text-xl font-semibold">Referral Program</h2>

        {/* Referral Code */}
        <div className="mb-4 flex items-center gap-3">
          <p className="font-medium">Referral Code:</p>
          <span className="rounded bg-gray-100 px-3 py-1 font-mono text-gray-700">
            {userData?.referralCode || "-"}
          </span>
          {userData?.referralCode && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(userData.referralCode);
                toast.success("Referral code copied!");
              }}
              className="rounded-lg bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
            >
              Copy
            </button>
          )}
        </div>

        {/* Referral Points */}
        <div className="flex items-center gap-3">
          <p className="font-medium">Referral Points:</p>
          <span className="rounded bg-green-100 px-3 py-1 font-semibold text-green-700">
            {userData?.referralPoints ?? 0} points
          </span>
        </div>
      </div>
    </div>
  );
}
