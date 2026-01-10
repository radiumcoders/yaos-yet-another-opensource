import { db } from "@/db/index";
import { dataTable } from "@/db/schema";
import { NextResponse } from "next/server";

// GET - Fetch all data
export async function GET() {
  try {
    const data = await db.select().from(dataTable);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching all data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
