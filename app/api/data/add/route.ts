import { db } from "@/db/index";
import { dataTable } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

// POST - Add new data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      catagory,
      githubUrl,
      githubRawUrl,
      registrieName,
    } = body;

    if (!title || !description || !catagory || !githubUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const formattedTitle = title.replace(/ /g, "-");
    const id = uuid();

    await db.insert(dataTable).values({
      id: id,
      title: formattedTitle,
      description: description,
      catagory: catagory,
      githubUrl: githubUrl,
      githubRawUrl: githubRawUrl || null,
      registrieName: registrieName || null,
    });

    revalidatePath("/");

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Error adding data:", error);
    return NextResponse.json({ error: "Failed to add data" }, { status: 500 });
  }
}
