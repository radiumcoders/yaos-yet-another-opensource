// Utility functions for server components to fetch data from API routes
// These are used in server components instead of direct server actions

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getData(category?: string) {
  const url = category
    ? `${API_BASE_URL}/api/data/category/${encodeURIComponent(category)}`
    : `${API_BASE_URL}/api/data/all`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function getFromTitle(title: string) {
  const url = `${API_BASE_URL}/api/data/title/${encodeURIComponent(title)}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function fetchComponentNames(url: string) {
  const response = await fetch(
    `${API_BASE_URL}/api/components/fetch-names?url=${encodeURIComponent(url)}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch component names");
  }

  return response.json();
}
