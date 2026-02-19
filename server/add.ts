"use server";

import { db } from "@/db";
import { dataTable } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function insertData(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const github_url = formData.get("github_url") as string;
    const live_url = formData.get("live_url") as string;
    const logo_url = formData.get("logo_url") as string;
    const tagsJson = formData.get("tags") as string;

    // Validate required fields
    if (!title || !description || !github_url || !live_url) {
      return {
        success: false,
        error: "Missing required fields",
      };
    }

    // Parse tags from JSON array
    let tagsArray: string[] = [];
    try {
      tagsArray = tagsJson ? JSON.parse(tagsJson) : [];
    } catch {
      tagsArray = [];
    }

    // Insert into database
    const result = await db
      .insert(dataTable)
      .values({
        title,
        description,
        github_url,
        live_url,
        logo_url: logo_url || null,
        tags: tagsArray,
      })
      .returning();

    console.log("Data inserted successfully:", result);

    // Revalidate pages to show new data immediately
    revalidatePath("/data");
    revalidatePath("/");

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
