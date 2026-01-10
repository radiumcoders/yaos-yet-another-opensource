import { db } from "@/db/index";
import { dataTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch data by category
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;

    const data = await db
      .select()
      .from(dataTable)
      .where(eq(dataTable.catagory, category));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data by category:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
