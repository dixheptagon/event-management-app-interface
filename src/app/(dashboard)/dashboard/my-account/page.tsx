"use client";

import useAuthStore from "@/stores/auth.store";
import axiosInstance from "@/utils/axios.instance";
import { AxiosError } from "axios";
import {
  CircleUserRound,
  Mail,
  Copy,
  Gift,
  Star,
  User,
  Award,
  TrendingUp,
} from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onGetUserPersonalInfo = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("api/dashboard/my-account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response?.data?.data);
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(
        "Failed to get user personal info, please try again later!" +
          err.response?.data?.error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyReferralCode = () => {
    if (userData?.referralCode) {
      navigator.clipboard.writeText(userData.referralCode);
      toast.success("Referral code copied to clipboard!");
    }
  };

  useEffect(() => {
    if (token) onGetUserPersonalInfo();
    if (!token) {
      toast.error("You are not logged in, please login first!");
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-800">My Account</h1>
          <p className="text-gray-600">
            Manage your personal information and referral program
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
              {/* Profile Header with Gradient */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                <div className="flex flex-col items-center gap-6 md:flex-row">
                  <div className="relative">
                    <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                      <CircleUserRound size={80} className="text-white" />
                    </div>
                    <div className="absolute -right-2 -bottom-2 rounded-full bg-green-500 p-2">
                      <div className="h-4 w-4 rounded-full bg-white"></div>
                    </div>
                  </div>

                  <div className="text-center md:text-left">
                    <h2 className="mb-2 text-3xl font-bold">
                      {userData?.fullname || "User Name"}
                    </h2>
                    <div className="flex items-center justify-center gap-2 md:justify-start">
                      <Mail size={18} />
                      <p className="text-blue-100">
                        {userData?.email || "user@example.com"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                      <User className="text-blue-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-semibold text-gray-800">
                          {userData?.fullname || "-"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                      <Mail className="text-purple-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-semibold text-gray-800">
                          {userData?.email || "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Stats Card */}
          <div className="space-y-6">
            {/* Points Card */}
            <div className="rounded-2xl bg-gradient-to-br from-green-400 to-blue-500 p-6 text-white shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award size={28} />
                  <h3 className="text-xl font-bold">Total Points</h3>
                </div>
                <TrendingUp size={24} className="opacity-70" />
              </div>

              <div className="mb-2 text-4xl font-bold">
                {userData?.referralPoints ?? 0}
              </div>
              <p className="text-green-100">Referral Points Earned</p>
            </div>

            {/* Quick Stats */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Account Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Account Status</span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium text-gray-800">2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Program Section */}
        <div className="mt-8">
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
            {/* Referral Header */}
            <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                  <Gift size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Referral Program</h2>
                  <p className="text-orange-100">
                    Share your code and earn rewards
                  </p>
                </div>
              </div>
            </div>

            {/* Referral Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Referral Code */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    Your Referral Code
                  </h3>
                  <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 p-6">
                    <div className="text-center">
                      <div className="inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3 shadow-md">
                        <code className="text-2xl font-bold tracking-wider text-gray-800">
                          {userData?.referralCode || "LOADING..."}
                        </code>
                        {userData?.referralCode && (
                          <button
                            onClick={handleCopyReferralCode}
                            className="ml-3 rounded-lg bg-blue-600 p-2 text-white transition-colors duration-200 hover:bg-blue-700"
                            title="Copy referral code"
                          >
                            <Copy size={18} />
                          </button>
                        )}
                      </div>
                      <p className="mt-3 text-sm text-gray-500">
                        Share this code with your friends
                      </p>
                    </div>
                  </div>
                </div>

                {/* Referral Benefits */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    Program Benefits
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-full bg-green-100 p-2">
                        <Star size={16} className="text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Earn Points</p>
                        <p className="text-sm text-gray-600">
                          Get points for every successful referral
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-full bg-blue-100 p-2">
                        <Gift size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          Exclusive Rewards
                        </p>
                        <p className="text-sm text-gray-600">
                          Unlock special bonuses and perks
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-full bg-purple-100 p-2">
                        <Award size={16} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">VIP Status</p>
                        <p className="text-sm text-gray-600">
                          Reach milestones for premium benefits
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
                <div className="text-center">
                  <h4 className="mb-2 text-xl font-bold text-gray-800">
                    Start Sharing Today!
                  </h4>
                  <p className="mb-4 text-gray-600">
                    Invite your friends and start earning rewards together
                  </p>
                  <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700">
                      Share via WhatsApp
                    </button>
                    <button className="rounded-lg bg-gray-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-gray-700">
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
