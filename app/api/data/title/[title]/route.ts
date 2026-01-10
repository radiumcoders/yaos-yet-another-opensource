import { db } from "@/db/index";
import { dataTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch data by title
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ title: string }> }
) {
  try {
    const { title } = await params;

    const data = await db
      .select()
      .from(dataTable)
      .where(eq(dataTable.title, title));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data by title:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
