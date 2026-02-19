"use server";

import { db } from "@/db";
import { dataTable } from "@/db/schema";

export async function insertData(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const github_url = formData.get("github_url") as string;
    const live_url = formData.get("live_url") as string;
    const tags = formData.get("tags") as string;

    // Validate required fields
    if (!title || !description || !github_url || !live_url) {
      return {
        success: false,
        error: "Missing required fields",
      };
    }

    // Parse tags from comma-separated string to array
    const tagsArray = tags
      ? tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];

    // Insert into database
    const result = await db
      .insert(dataTable)
      .values({
        title,
        description,
        github_url,
        live_url,
        tags: tagsArray,
      })
      .returning();

    console.log("Data inserted successfully:", result);

    return {
      success: true,
      data: result[0],
    };
  } catch (error) {
    console.error("Error inserting data:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
