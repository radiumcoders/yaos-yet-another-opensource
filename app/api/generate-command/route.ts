import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { components, rigName } = body;

    if (!components || !Array.isArray(components)) {
      return NextResponse.json(
        { error: "Components array is required" },
        { status: 400 }
      );
    }

    if (!rigName) {
      return NextResponse.json(
        { error: "rigName is required" },
        { status: 400 }
      );
    }

    const command = `pnpx shadcn@latest add ${components
      .map((comp) => `${rigName}/${comp}`)
      .join(" ")}${rigName.includes("https://") ? ".json" : ""}`;

    console.log("Generated Command:", command);

    return NextResponse.json({ command });
  } catch (error) {
    console.error("Error generating command:", error);
    return NextResponse.json(
      { error: "Failed to generate command" },
      { status: 500 }
    );
  }
}
