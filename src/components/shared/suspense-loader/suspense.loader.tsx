"use client";

// components/ui/SuspenseLoader.tsx
import React from "react";
import { Loader2, Coffee, Heart, Star } from "lucide-react";

interface SuspenseLoaderProps {
  /** Custom loading message */
  message?: string;
  /** Loader variant style */
  variant?: "default" | "spinner" | "pulse" | "dots" | "bars";
  /** Size of the loader */
  size?: "sm" | "md" | "lg";
  /** Show fun messages */
  showFunMessage?: boolean;
  /** Custom background */
  background?: "default" | "white" | "transparent";
  /** Full screen loader */
  fullScreen?: boolean;
}

const SuspenseLoader: React.FC<SuspenseLoaderProps> = ({
  message = "Loading...",
  variant = "default",
  size = "md",
  showFunMessage = false,
  background = "default",
  fullScreen = true,
}) => {
  const funMessages = [
    "Brewing something awesome ☕",
    "Crafting magic ✨",
    "Almost there! 🚀",
    "Loading awesomeness...",
    "Preparing your experience 🎯",
  ];

  const randomFunMessage =
    funMessages[Math.floor(Math.random() * funMessages.length)];

  // Size configurations
  const sizeConfig = {
    sm: {
      spinner: "w-8 h-8",
      text: "text-sm",
      container: "space-y-3",
    },
    md: {
      spinner: "w-12 h-12",
      text: "text-base",
      container: "space-y-4",
    },
    lg: {
      spinner: "w-16 h-16",
      text: "text-lg",
      container: "space-y-6",
    },
  };

  // Background configurations
  const backgroundConfig = {
    default: "bg-gradient-to-br from-slate-50 to-blue-50",
    white: "bg-white",
    transparent: "bg-transparent",
  };

  // Container classes
  const containerClass = fullScreen
    ? `min-h-screen flex items-center justify-center ${backgroundConfig[background]}`
    : `flex items-center justify-center p-8 ${backgroundConfig[background]}`;

  // Render different loader variants
  const renderLoader = () => {
    const { spinner, text, container } = sizeConfig[size];

    switch (variant) {
      case "spinner":
        return (
          <div className={`text-center ${container}`}>
            <Loader2
              className={`${spinner} mx-auto animate-spin text-blue-600`}
            />
            <div className="space-y-2">
              <h3 className={`font-semibold text-gray-800 ${text}`}>
                {showFunMessage ? randomFunMessage : message}
              </h3>
            </div>
          </div>
        );

      case "pulse":
        return (
          <div className={`text-center ${container}`}>
            <div className={`${spinner} relative mx-auto`}>
              <div className="absolute inset-0 animate-ping rounded-full bg-blue-500 opacity-75"></div>
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-blue-600">
                <Heart className="h-1/2 w-1/2 text-white" />
              </div>
            </div>
            <h3 className={`font-semibold text-gray-800 ${text}`}>
              {showFunMessage ? randomFunMessage : message}
            </h3>
          </div>
        );

      case "dots":
        return (
          <div className={`text-center ${container}`}>
            <div className="mb-4 flex justify-center space-x-2">
              <div className="h-3 w-3 animate-bounce rounded-full bg-blue-500"></div>
              <div
                className="h-3 w-3 animate-bounce rounded-full bg-blue-500"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="h-3 w-3 animate-bounce rounded-full bg-blue-500"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <h3 className={`font-semibold text-gray-800 ${text}`}>
              {showFunMessage ? randomFunMessage : message}
            </h3>
          </div>
        );

      case "bars":
        return (
          <div className={`text-center ${container}`}>
            <div className="mb-4 flex items-end justify-center space-x-1">
              <div
                className="w-2 animate-pulse rounded-full bg-blue-500"
                style={{ height: "20px", animationDelay: "0s" }}
              ></div>
              <div
                className="w-2 animate-pulse rounded-full bg-blue-500"
                style={{ height: "30px", animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 animate-pulse rounded-full bg-blue-500"
                style={{ height: "25px", animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 animate-pulse rounded-full bg-blue-500"
                style={{ height: "35px", animationDelay: "0.3s" }}
              ></div>
              <div
                className="w-2 animate-pulse rounded-full bg-blue-500"
                style={{ height: "20px", animationDelay: "0.4s" }}
              ></div>
            </div>
            <h3 className={`font-semibold text-gray-800 ${text}`}>
              {showFunMessage ? randomFunMessage : message}
            </h3>
          </div>
        );

      default:
        return (
          <div className={`text-center ${container}`}>
            {/* Dual Ring Spinner */}
            <div className="relative mb-6">
              <div
                className={`${spinner} mx-auto animate-spin rounded-full border-4 border-blue-200 border-t-blue-600`}
              ></div>
              <div
                className={`absolute inset-0 ${spinner} animate-spin-reverse mx-auto rounded-full border-4 border-transparent border-r-purple-400 opacity-60`}
              ></div>
            </div>

            {/* Loading Text */}
            <div className="space-y-2">
              <h3 className={`font-semibold text-gray-800 ${text}`}>
                {showFunMessage ? randomFunMessage : message}
              </h3>
              {!showFunMessage && (
                <p className="text-sm text-gray-600">Please wait a moment...</p>
              )}
            </div>

            {/* Animated Dots */}
            <div className="mt-4 flex justify-center space-x-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500"></div>
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={containerClass}>
      {renderLoader()}

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-spin-reverse {
          animation: spin-reverse 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SuspenseLoader;

// Usage Examples:

// 1. Basic Usage with Suspense
/*
<Suspense fallback={<SuspenseLoader />}>
  <RegisterForm />
</Suspense>
*/

// 2. Custom message and variant
/*
<Suspense fallback={
  <SuspenseLoader 
    message="Creating your account..." 
    variant="spinner"
    size="lg"
    showFunMessage={true}
  />
}>
  <RegisterForm />
</Suspense>
*/

// 3. Inline loader (not full screen)
/*
<SuspenseLoader 
  fullScreen={false}
  variant="dots"
  size="sm"
  background="transparent"
  message="Loading data..."
/>
*/

// 4. Different variants showcase
/*
<div className="grid grid-cols-2 gap-8 p-8">
  <SuspenseLoader variant="default" fullScreen={false} />
  <SuspenseLoader variant="spinner" fullScreen={false} />
  <SuspenseLoader variant="pulse" fullScreen={false} />
  <SuspenseLoader variant="dots" fullScreen={false} />
  <SuspenseLoader variant="bars" fullScreen={false} />
</div>
*/
