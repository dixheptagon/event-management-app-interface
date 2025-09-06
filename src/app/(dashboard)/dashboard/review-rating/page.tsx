"use client";

import React, { useEffect, useState } from "react";
import {
  Star,
  Send,
  Calendar,
  MapPin,
  Users,
  Clock,
  MessageSquare,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import useAuthStore from "@/stores/auth.store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EventReviewComponent = () => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      toast.error("You are not logged in, please login first!");
      router.replace("/login");
    }
  }, [token]);

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
  };

  const handleStarHover = (starValue: number) => {
    setHoveredStar(starValue);
  };

  const handleStarLeave = () => {
    setHoveredStar(0);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please provide a rating first!");
      return;
    }
    if (review.trim() === "") {
      alert("Please write your review!");
      return;
    }

    alert(
      `Review submitted successfully!\n\nRating: ${rating} stars\nReview: "${review}"`,
    );

    // Reset form and close modal
    setRating(0);
    setReview("");
    setIsOpen(false);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleStarLeave}
          className="transition-transform hover:scale-110 focus:outline-none active:scale-95"
        >
          <Star
            size={32}
            className={`transition-all duration-200 ${
              i <= (hoveredStar || rating)
                ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
                : "text-gray-300 hover:text-yellow-300"
            }`}
          />
        </button>,
      );
    }
    return stars;
  };

  const getRatingText = (ratingValue: number) => {
    switch (ratingValue) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "Select a rating";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header Navigation */}
        <div className="mb-8">
          <div className="rounded-t-xl border-b border-gray-200 bg-white/50 backdrop-blur-sm">
            <nav className="flex space-x-8 px-6">
              <button className="border-b-2 border-transparent px-1 py-4 text-sm font-medium whitespace-nowrap text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700">
                Active Events
              </button>
              <button className="border-b-2 border-blue-500 px-1 py-4 text-sm font-medium whitespace-nowrap text-blue-600">
                Past Events
              </button>
            </nav>
          </div>
        </div>

        {/* Event Information Card */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm">
          <div className="lg:flex">
            <div className="p-8 lg:flex-1">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
                  Event Completed
                </span>
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
                  1 Ticket Used
                </span>
              </div>

              <h1 className="mb-4 text-3xl leading-tight font-bold text-gray-900 lg:text-4xl">
                CINTA KALA SENJA
              </h1>
              <h2 className="mb-8 text-xl font-medium text-gray-700">
                featuring BARASUARA & NADHIF BASALAMAH
              </h2>

              <div className="mb-8 grid grid-cols-1 gap-4 text-gray-600 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 flex-shrink-0 text-blue-500" />
                  <span>September 25, 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 flex-shrink-0 text-purple-500" />
                  <span>7:00 PM - 11:00 PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 flex-shrink-0 text-red-500" />
                  <span>Bengkel Space, Jakarta</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Music Concert</span>
                </div>
              </div>

              {/* Review Button */}
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Write Review & Rating
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="mb-2 text-center text-2xl font-bold">
                      Rate Your Experience
                    </DialogTitle>
                    <p className="text-center text-gray-600">
                      How was "CINTA KALA SENJA" event?
                    </p>
                  </DialogHeader>

                  <div className="mt-6 space-y-6">
                    {/* Rating Section */}
                    <div className="space-y-4 text-center">
                      <Label className="text-lg font-semibold">
                        Your Rating
                      </Label>
                      <div className="flex items-center justify-center gap-2">
                        {renderStars()}
                      </div>
                      <p className="min-h-[24px] text-lg font-medium text-gray-700">
                        {getRatingText(hoveredStar || rating)}
                      </p>
                    </div>

                    {/* Review Text Area */}
                    <div className="space-y-3">
                      <Label htmlFor="review" className="text-lg font-semibold">
                        Your Review
                      </Label>
                      <Textarea
                        id="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Share your experience... How was the performance? Was the venue comfortable? How was the service? What did you enjoy most?"
                        rows={5}
                        maxLength={1000}
                        className="resize-none text-base"
                      />
                      <div className="text-right text-sm text-gray-500">
                        {review.length}/1000 characters
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Submit Review
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="relative h-64 lg:h-auto lg:w-96">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                <div className="p-8 text-center text-white">
                  <div className="mb-4 text-6xl">🎵</div>
                  <div className="mb-2 text-2xl font-bold">CINTA KALA</div>
                  <div className="text-xl">SENJA</div>
                  <div className="mt-4 text-sm opacity-90">BARASUARA</div>
                  <div className="text-sm opacity-90">NADHIF BASALAMAH</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-6 backdrop-blur-sm lg:p-8">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-blue-900">
            <span className="text-2xl">💡</span>
            Tips for Writing Great Reviews
          </h3>
          <div className="grid gap-4 text-blue-800 md:grid-cols-2">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-blue-500">•</span>
                <span>
                  Share specific details about what you liked or didn't like
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-blue-500">•</span>
                <span>
                  Mention the atmosphere, sound quality, and venue experience
                </span>
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-blue-500">•</span>
                <span>Use respectful and constructive language</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-blue-500">•</span>
                <span>Help future attendees make informed decisions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventReviewComponent;
