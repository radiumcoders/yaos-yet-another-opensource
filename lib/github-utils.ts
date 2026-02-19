/**
 * GitHub utilities for extracting repo info and fetching logos
 */

export interface GitHubRepoInfo {
  owner: string;
  repo: string;
}

/**
 * Extract owner and repo name from GitHub URL
 * Examples:
 * - https://github.com/facebook/react -> { owner: 'facebook', repo: 'react' }
 * - github.com/vercel/next.js -> { owner: 'vercel', repo: 'next.js' }
 */
export function extractGitHubRepoInfo(url: string): GitHubRepoInfo | null {
  try {
    // Handle various GitHub URL formats
    const patterns = [
      /github\.com\/([^\/]+)\/([^\/\?#]+)/i, // Standard URL
      /^([^\/]+)\/([^\/]+)$/,                // Just owner/repo
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return {
          owner: match[1],
          repo: match[2].replace(/\.git$/, ""), // Remove .git suffix if present
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Error extracting GitHub repo info:", error);
    return null;
  }
}

/**
 * Fetch GitHub repository logo/avatar
 * Strategy:
 * 1. Get user/org avatar from GitHub API
 * 2. Fallback to simple avatar URL pattern (no API needed)
 */
export async function fetchGitHubRepoLogo(
  owner: string,
  repo: string
): Promise<string | null> {
  try {
    // Try GitHub API first
    const response = await fetch(`https://api.github.com/users/${owner}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      // Cache for 1 hour to reduce API calls
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.avatar_url) {
        return data.avatar_url;
      }
    }

    // Fallback: Direct avatar URL (no API needed)
    // This always works for valid GitHub users/orgs
    return `https://github.com/${owner}.png`;
  } catch (error) {
    console.error("Error fetching GitHub logo:", error);
    // Return fallback even on error
    return `https://github.com/${owner}.png`;
  }
}

/**
 * Validate if a URL points to a valid image
 */
export async function isValidImageUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      // Don't cache validation checks
      cache: "no-store",
    });

    if (!response.ok) {
      return false;
    }

    const contentType = response.headers.get("content-type");
    return contentType?.startsWith("image/") ?? false;
  } catch (error) {
    console.error("Error validating image URL:", error);
    return false;
  }
}

/**
 * Get GitHub logo from repository URL
 * This is the main function to use
 */
export async function getGitHubLogoFromUrl(
  githubUrl: string
): Promise<string | null> {
  const repoInfo = extractGitHubRepoInfo(githubUrl);

  if (!repoInfo) {
    return null;
  }

  return await fetchGitHubRepoLogo(repoInfo.owner, repoInfo.repo);
}
