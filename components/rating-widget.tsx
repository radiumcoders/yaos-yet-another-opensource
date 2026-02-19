"use client";

import { useEffect, useState } from "react";
import StarRating from "@/components/ui/star-rating";
import { submitRating, hasUserRated } from "@/server/ratings";

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
    initialRating ? parseFloat(initialRating) : 0
  );
  const [totalRatings, setTotalRatings] = useState<number>(
    initialTotalRatings || 0
  );
  const [hasRated, setHasRated] = useState(false);
  const [userRating, setUserRating] = useState<number | undefined>();
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

  const handleRate = async (newRating: number) => {
    if (hasRated || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitRating(toolId, newRating);

      if (result.success && result.data) {
        setRating(parseFloat(result.data.average_rating));
        setTotalRatings(result.data.total_ratings);
        setHasRated(true);
        setUserRating(newRating);
      } else {
        setError(result.error || "Failed to submit rating");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="animate-pulse flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-muted rounded"
              style={{ width: size, height: size }}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <StarRating
        rating={rating}
        totalRatings={totalRatings}
        size={size}
        interactive={!hasRated}
        onRate={handleRate}
        locked={hasRated}
        showCount={showCount}
      />

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}

      {!hasRated && !isSubmitting && totalRatings === 0 && (
        <p className="text-xs text-muted-foreground">
          Be the first to rate this tool!
        </p>
      )}

      {isSubmitting && (
        <p className="text-xs text-muted-foreground">
          Submitting your rating...
        </p>
      )}
    </div>
  );
}
