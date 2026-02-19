/**
 * Calculate average rating from an array of ratings
 */
export function calculateAverage(ratings: number[]): number {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return sum / ratings.length;
}

/**
 * Format rating for display (e.g., 4.5, 3.0)
 */
export function formatRating(rating: number | string): string {
  const num = typeof rating === "string" ? parseFloat(rating) : rating;
  return num.toFixed(1);
}

/**
 * Validate rating value (must be between 1 and 5)
 */
export function isValidRating(rating: number): boolean {
  return Number.isInteger(rating) && rating >= 1 && rating <= 5;
}
