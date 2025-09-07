"use client";

// app/not-found.tsx
import Image from "next/image";
import Link from "next/link";
import { Home, ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="mx-auto max-w-4xl text-center">
        {/* Animated Background Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full bg-blue-200/30 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-200/20 blur-3xl delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform animate-bounce rounded-full bg-pink-200/40 blur-2xl"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="animate-fade-in mb-8">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={48}
              priority
              className="mx-auto drop-shadow-lg"
            />
          </div>

          {/* 404 Illustration */}
          <div className="animate-bounce-slow mb-8">
            <div className="relative inline-block">
              {/* Large 404 Text */}
              <h1 className="animate-gradient-x bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-8xl font-black text-transparent sm:text-9xl lg:text-[12rem]">
                404
              </h1>

              {/* Floating Elements around 404 */}
              <div className="animate-float absolute -top-4 -left-4 h-8 w-8 rounded-full bg-yellow-400 delay-0"></div>
              <div className="animate-float absolute top-1/2 -right-8 h-6 w-6 rounded-full bg-green-400 delay-300"></div>
              <div className="animate-float absolute -bottom-2 left-1/3 h-4 w-4 rounded-full bg-red-400 delay-500"></div>
              <div className="animate-float absolute top-1/4 right-1/4 h-3 w-3 rounded-full bg-blue-400 delay-700"></div>
            </div>
          </div>

          {/* Error Messages */}
          <div className="animate-fade-in-up mb-8 space-y-4 delay-300">
            <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl">
              Oops! Page Not Found
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              The page you&apos;re looking for seems to have wandered off into
              the digital wilderness. Don&apos;t worry, even the best explorers
              sometimes take a wrong turn!
            </p>
          </div>

          <p className="mb-6 text-gray-500">Here are some suggestions:</p>

          {/* Action Buttons */}
          <div className="animate-fade-in-up flex flex-col items-center justify-center gap-4 delay-700 sm:flex-row">
            <Link
              href="/"
              className="group flex items-center gap-3 rounded-xl bg-[#041846] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#041846]/80 hover:shadow-xl"
            >
              <Home className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              Back to Home
            </Link>

            <Link
              href="/explore-events"
              className="group flex items-center gap-3 rounded-xl border-2 border-gray-200/50 bg-white/80 px-8 py-4 font-semibold text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#041846]/20 hover:bg-white hover:text-[#041846] hover:shadow-xl"
            >
              <Compass className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              Explore Events
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-3 rounded-xl bg-gray-100/80 px-6 py-3 font-medium text-gray-600 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-gray-200/80 hover:text-gray-800 hover:shadow-lg"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Go Back
            </button>
          </div>

          {/* Fun Footer Message */}
          <div className="animate-fade-in-up mt-12 delay-1000">
            <p className="text-sm text-gray-400">
              Lost? Don&apos;t worry, we&apos;ve all been there! 🗺️✨
            </p>
          </div>
        </div>
      </div>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(5deg);
          }
          66% {
            transform: translateY(5px) rotate(-5deg);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .delay-0 {
          animation-delay: 0ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}
