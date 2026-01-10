import { NextRequest, NextResponse } from "next/server";

// GET - Fetch component names from registry URL
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json(
        { error: "URL parameter is required" },
        { status: 400 }
      );
    }

    const res = await fetch(url);
    const data = await res.json();

    // Extract component names from the registry items array
    // Only include items with type "registry:ui" or "registry:component"
    if (data.items && Array.isArray(data.items)) {
      const componentNames = data.items
        .filter(
          (item: { type: string }) =>
            item.type === "registry:ui" || item.type === "registry:component"
        )
        .map((item: { name: string }) => item.name);

      return NextResponse.json(componentNames);
    }

    return NextResponse.json([]);
  } catch (error) {
    console.error("Error fetching component names:", error);
    return NextResponse.json(
      { error: "Failed to fetch component names" },
      { status: 500 }
    );
  }
}
