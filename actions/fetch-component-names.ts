"use server";

export async function fetchComponentNames(url: string) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    // Extract component names from the registry items array
    // Only include items with type "registry:ui" or "registry:component"
    if (data.items && Array.isArray(data.items)) {
      return data.items
        .filter(
          (item: { type: string }) =>
            item.type === "registry:ui" || item.type === "registry:component"
        )
        .map((item: { name: string }) => item.name);
    }

    return [];
  } catch (error) {
    console.error("Error fetching component names:", error);
    return [];
  }
}
