"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number; // Average rating (0-5, can be decimal like 4.5)
  totalRatings?: number; // Total number of ratings
  maxStars?: number; // Maximum number of stars (default 5)
  size?: number; // Size of stars in pixels
  interactive?: boolean; // Whether stars are clickable
  onRate?: (rating: number) => void; // Callback when rating is clicked
  className?: string;
  showCount?: boolean; // Show rating count
  locked?: boolean; // If true, shows locked state (user already rated)
}

export default function StarRating({
  rating,
  totalRatings,
  maxStars = 5,
  size = 16,
  interactive = false,
  onRate,
  className,
  showCount = true,
  locked = false,
}: StarRatingProps) {
  const handleStarClick = (starRating: number) => {
    if (interactive && !locked && onRate) {
      onRate(starRating);
    }
  };

  const renderStar = (index: number) => {
    const starValue = index + 1;
    const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;

    return (
      <button
        key={index}
        type="button"
        className={cn(
          "relative inline-block",
          interactive && !locked && "cursor-pointer hover:scale-110 transition-transform",
          locked && "cursor-not-allowed opacity-60"
        )}
        onClick={() => handleStarClick(starValue)}
        disabled={!interactive || locked}
        aria-label={`Rate ${starValue} stars`}
      >
        {/* Background star (empty) */}
        <Star
          size={size}
          className="text-muted-foreground"
          strokeWidth={1.5}
        />
        
        {/* Foreground star (filled) */}
        <div
          className="absolute top-0 left-0 overflow-hidden"
          style={{ width: `${fillPercentage}%` }}
        >
          <Star
            size={size}
            className="text-yellow-500 fill-yellow-500"
            strokeWidth={1.5}
          />
        </div>
      </button>
    );
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }, (_, i) => renderStar(i))}
      </div>
      
      {showCount && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover/card:text-muted-foreground">
          <span className="font-medium">
            {rating > 0 ? rating.toFixed(1) : "0.0"}
          </span>
          {totalRatings !== undefined && (
            <span className="text-xs">
              ({totalRatings} {totalRatings === 1 ? "rating" : "ratings"})
            </span>
          )}
        </div>
      )}
      
      {locked && (
        <span className="text-xs text-muted-foreground italic">
          Already rated
        </span>
      )}
    </div>
  );
}
