"use server";

import { getGitHubLogoFromUrl, isValidImageUrl } from "@/lib/github-utils";

/**
 * Fetch GitHub logo for a repository URL
 */
export async function fetchGitHubLogo(githubUrl: string) {
  try {
    if (!githubUrl) {
      return {
        success: false,
        error: "GitHub URL is required",
      };
    }

    const logoUrl = await getGitHubLogoFromUrl(githubUrl);

    if (!logoUrl) {
      return {
        success: false,
        error: "Could not extract repository information from URL",
      };
    }

    return {
      success: true,
      logoUrl,
    };
  } catch (error) {
    console.error("Error fetching GitHub logo:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch logo",
    };
  }
}

/**
 * Validate if an image URL is accessible
 */
export async function validateImageUrl(url: string) {
  try {
    if (!url) {
      return {
        success: false,
        error: "URL is required",
      };
    }

    const isValid = await isValidImageUrl(url);

    return {
      success: isValid,
      error: isValid ? undefined : "Invalid or inaccessible image URL",
    };
  } catch (error) {
    console.error("Error validating image URL:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to validate URL",
    };
  }
}
