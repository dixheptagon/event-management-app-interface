"use client";

import { Wrench } from "lucide-react";

export default function UnderConstruction() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center text-center">
      <Wrench size={80} className="mb-6 text-yellow-500" />
      <h1 className="text-3xl font-bold text-gray-800">Under Construction</h1>
      <p className="mt-3 max-w-md text-gray-600">
        This page is currently being built. Please check back later!
      </p>
      <button
        onClick={() => window.history.back()}
        className="mt-6 rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
      >
        Go Back
      </button>
    </div>
  );
}
