"use server";

import { db } from "@/db";
import { dataTable, ratingsTable } from "@/db/schema";
import { getClientIP, hashIP } from "@/lib/ip-utils";
import { isValidRating, calculateAverage } from "@/lib/rating-utils";
import { eq, and, desc, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Submit a rating for a tool
 */
export async function submitRating(toolId: string, rating: number) {
  try {
    // Validate rating
    if (!isValidRating(rating)) {
      return {
        success: false,
        error: "Invalid rating. Must be between 1 and 5.",
      };
    }

    // Get client IP and hash it
    const clientIP = await getClientIP();
    const ipHash = hashIP(clientIP);

    // Check if this IP has already rated this tool
    const existingRating = await db
      .select()
      .from(ratingsTable)
      .where(
        and(
          eq(ratingsTable.tool_id, toolId),
          eq(ratingsTable.ip_hash, ipHash)
        )
      )
      .limit(1);

    if (existingRating.length > 0) {
      return {
        success: false,
        error: "You have already rated this tool.",
      };
    }

    // Insert the rating
    await db.insert(ratingsTable).values({
      tool_id: toolId,
      rating,
      ip_hash: ipHash,
    });

    // Get all ratings for this tool
    const allRatings = await db
      .select()
      .from(ratingsTable)
      .where(eq(ratingsTable.tool_id, toolId));

    // Calculate new average
    const ratings = allRatings.map((r) => r.rating);
    const average = calculateAverage(ratings);

    // Update the tool's aggregate data
    await db
      .update(dataTable)
      .set({
        average_rating: average.toFixed(2),
        total_ratings: ratings.length,
      })
      .where(eq(dataTable.id, toolId));

    // Revalidate the data page to show fresh ratings immediately
    revalidatePath("/data");
    revalidatePath("/");

    return {
      success: true,
      data: {
        average_rating: average.toFixed(2),
        total_ratings: ratings.length,
      },
    };
  } catch (error) {
    console.error("Error submitting rating:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit rating",
    };
  }
}

/**
 * Check if the current user has already rated a tool
 */
export async function hasUserRated(toolId: string): Promise<{
  hasRated: boolean;
  rating?: number;
}> {
  try {
    const clientIP = await getClientIP();
    const ipHash = hashIP(clientIP);

    const existingRating = await db
      .select()
      .from(ratingsTable)
      .where(
        and(
          eq(ratingsTable.tool_id, toolId),
          eq(ratingsTable.ip_hash, ipHash)
        )
      )
      .limit(1);

    if (existingRating.length > 0) {
      return {
        hasRated: true,
        rating: existingRating[0].rating,
      };
    }

    return {
      hasRated: false,
    };
  } catch (error) {
    console.error("Error checking user rating:", error);
    return {
      hasRated: false,
    };
  }
}

/**
 * Get top rated tools with minimum rating threshold
 */
export async function getTopRatedTools(limit = 6, minRatings = 3) {
  try {
    const topTools = await db
      .select()
      .from(dataTable)
      .where(sql`${dataTable.total_ratings} >= ${minRatings}`)
      .orderBy(desc(dataTable.average_rating), desc(dataTable.total_ratings))
      .limit(limit);

    return topTools;
  } catch (error) {
    console.error("Error fetching top rated tools:", error);
    return [];
  }
}
