"use client";

import {
  Wrench,
  Hammer,
  HardHat,
  ArrowLeft,
  Clock,
  Coffee,
  Zap,
  Sparkles,
  Construction,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function UnderConstruction() {
  const [progress, setProgress] = useState(0);
  const [currentTool, setCurrentTool] = useState(0);

  const tools = [
    { icon: Wrench, color: "text-blue-500" },
    { icon: Hammer, color: "text-red-500" },
    { icon: HardHat, color: "text-yellow-500" },
    { icon: Construction, color: "text-orange-500" },
  ];

  // Animated progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + Math.random() * 5;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Rotating tools animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTool((prev) => (prev + 1) % tools.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 p-4">
      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-32 w-32 animate-pulse rounded-full bg-yellow-300/20 blur-2xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-48 w-48 animate-pulse rounded-full bg-orange-300/15 blur-3xl delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 transform animate-bounce rounded-full bg-amber-300/25 blur-xl"></div>

        {/* Floating Construction Icons */}
        <div className="animate-float absolute top-20 left-20 delay-0">
          <Hammer className="h-6 w-6 rotate-45 transform text-gray-300" />
        </div>
        <div className="animate-float absolute top-40 right-32 delay-500">
          <Wrench className="h-8 w-8 -rotate-12 transform text-gray-300" />
        </div>
        <div className="animate-float absolute bottom-32 left-1/3 delay-1000">
          <HardHat className="h-7 w-7 text-gray-300" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Main Icon with Animation */}
        <div className="relative mb-8">
          <div className="relative inline-block">
            {/* Rotating Background Circle */}
            <div className="animate-spin-slow absolute inset-0 mx-auto h-32 w-32 rounded-full border-4 border-dashed border-yellow-300"></div>

            {/* Main Tool Icon */}
            <div className="relative rounded-full border-4 border-yellow-200 bg-white p-8 shadow-2xl">
              {(() => {
                const Tool = tools[currentTool].icon;
                return (
                  <Tool
                    size={80}
                    className={`${tools[currentTool].color} animate-bounce-gentle transition-colors duration-500`}
                  />
                );
              })()}
            </div>

            {/* Floating Sparkles */}
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 animate-pulse text-yellow-400" />
            <Sparkles className="absolute -bottom-1 -left-3 h-4 w-4 animate-pulse text-orange-400 delay-500" />
            <Zap className="absolute top-1/2 -right-4 h-5 w-5 animate-pulse text-blue-400 delay-300" />
          </div>
        </div>

        {/* Title */}
        <div className="animate-fade-in-up mb-6">
          <h1 className="mb-2 bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Under Construction
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Clock className="h-5 w-5" />
            <span className="text-sm font-medium">Work in Progress</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="animate-fade-in-up mb-8 delay-300">
          <div className="rounded-full border border-yellow-200/50 bg-white/60 p-2 shadow-lg backdrop-blur-sm">
            <div className="relative h-6 overflow-hidden rounded-full bg-gray-200">
              <div
                className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-500 transition-all duration-500 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="animate-shimmer absolute inset-0 bg-white/30"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-700 drop-shadow-sm">
                  {Math.floor(progress)}% Complete
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="animate-fade-in-up mb-10 delay-500">
          <p className="mx-auto mb-4 max-w-md text-lg leading-relaxed text-gray-700">
            We're working hard to bring you something amazing! Our team is
            putting the finishing touches on this page.
          </p>

          {/* Fun Status Messages */}
          <div className="rounded-xl border border-yellow-200/50 bg-white/70 p-6 shadow-lg backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-center gap-3">
              <Coffee className="h-5 w-5 text-amber-600" />
              <span className="text-sm font-medium text-gray-600">
                Our developers are fueled by coffee
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Expected completion: To Be Soon™
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="animate-fade-in-up mb-10 grid grid-cols-1 gap-4 delay-700 sm:grid-cols-3">
          <div className="rounded-lg border border-green-200/50 bg-white/60 p-4 shadow-md backdrop-blur-sm">
            <div className="mx-auto mb-2 h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
            <p className="text-sm font-medium text-gray-700">Design</p>
            <p className="text-xs text-green-600">In Progress</p>
          </div>
          <div className="rounded-lg border border-yellow-200/50 bg-white/60 p-4 shadow-md backdrop-blur-sm">
            <div className="mx-auto mb-2 h-3 w-3 animate-pulse rounded-full bg-yellow-500"></div>
            <p className="text-sm font-medium text-gray-700">Development</p>
            <p className="text-xs text-yellow-600">In Progress</p>
          </div>
          <div className="rounded-lg border border-gray-200/50 bg-white/60 p-4 shadow-md backdrop-blur-sm">
            <div className="mx-auto mb-2 h-3 w-3 rounded-full bg-gray-400"></div>
            <p className="text-sm font-medium text-gray-700">Testing</p>
            <p className="text-xs text-gray-500">In Progress</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="animate-fade-in-up flex flex-col justify-center gap-4 delay-1000 sm:flex-row">
          <button
            onClick={() => window.history.back()}
            className="group flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl"
          >
            <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            Go Back
          </button>

          <button
            onClick={() => window.location.reload()}
            className="group flex items-center justify-center gap-3 rounded-xl border-2 border-gray-200/50 bg-white/80 px-8 py-4 font-semibold text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:text-blue-600 hover:shadow-xl"
          >
            <Clock className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            Check Again
          </button>
        </div>

        {/* Footer Message */}
        <div className="animate-fade-in-up mt-8 delay-1200">
          <p className="text-sm text-gray-500">
            Thanks for your patience! 🚧✨
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
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
        .delay-1200 {
          animation-delay: 1200ms;
        }
      `}</style>
    </div>
  );
}
