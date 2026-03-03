"use client";

import { useEffect, useState } from "react";
import StarRating from "@/components/ui/star-rating";
import { submitRating, hasUserRated } from "@/server/ratings";
import { Button } from "@/components/ui/button";

interface RatingWidgetProps {
  toolId: string;
  initialRating?: string | null;
  initialTotalRatings?: number | null;
  size?: number;
  showCount?: boolean;
}

export default function RatingWidget({
  toolId,
  initialRating,
  initialTotalRatings,
  size = 16,
  showCount = true,
}: RatingWidgetProps) {
  const [rating, setRating] = useState<number>(
    initialRating ? parseFloat(initialRating) : 0,
  );
  const [totalRatings, setTotalRatings] = useState<number>(
    initialTotalRatings || 0,
  );
  const [hasRated, setHasRated] = useState(false);
  const [userRating, setUserRating] = useState<number | undefined>();
  const [selectedRating, setSelectedRating] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if user has already rated on mount
  useEffect(() => {
    const checkRating = async () => {
      try {
        const result = await hasUserRated(toolId);
        setHasRated(result.hasRated);
        setUserRating(result.rating);
      } catch (err) {
        console.error("Error checking user rating:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkRating();
  }, [toolId]);

  const handleSelectRating = (newRating: number) => {
    if (!hasRated && !isSubmitting) {
      setSelectedRating(newRating);
    }
  };

  const handleSubmitRating = async () => {
    // Prevent multiple submissions with multiple checks
    if (hasRated || isSubmitting || !selectedRating) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitRating(toolId, selectedRating);

      if (result.success && result.data) {
        setRating(parseFloat(result.data.average_rating));
        setTotalRatings(result.data.total_ratings);
        setHasRated(true);
        setUserRating(selectedRating);
        setSelectedRating(undefined);
      } else {
        setError(result.error || "Failed to submit rating");
        setIsSubmitting(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="animate-pulse flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-muted rounded"
              style={{ width: size, height: size }}
            />
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-muted-foreground/60 animate-pulse">
            0.0
          </span>
          {showCount && (
            <span className="text-xs text-muted-foreground/60 animate-pulse">
              (0 ratings)
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Display Current Rating */}
      <div>
        <p className="text-xs text-muted-foreground mb-2 font-medium">
          Current Rating
        </p>
        <StarRating
          rating={rating}
          totalRatings={totalRatings}
          size={size}
          interactive={false}
          locked={true}
          showCount={showCount}
        />
      </div>

      {/* Submit Review Section */}
      {!hasRated && (
        <div>
          <p className="text-xs text-muted-foreground mb-2 font-medium">
            Your Rating
          </p>
          <div className="space-y-2">
            <StarRating
              rating={selectedRating || 0}
              totalRatings={0}
              size={size}
              interactive={true}
              onRate={handleSelectRating}
              locked={false}
              showCount={false}
            />
            <Button
              onClick={handleSubmitRating}
              disabled={!selectedRating || isSubmitting}
              size="sm"
              className="w-full"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}

      {totalRatings === 0 && (
        <p className="text-xs text-muted-foreground italic">
          Be the first to rate this tool!
        </p>
      )}
    </div>
  );
}
