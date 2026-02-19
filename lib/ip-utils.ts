import { headers } from "next/headers";
import crypto from "crypto";

/**
 * Get client IP address from request headers
 */
export async function getClientIP(): Promise<string> {
  const headersList = await headers();
  
  // Check common headers for IP address (in order of priority)
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIP = headersList.get("x-real-ip");
  const cfConnectingIP = headersList.get("cf-connecting-ip"); // Cloudflare
  
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(",")[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  // Fallback to a default (for development/localhost)
  return "unknown";
}

/**
 * Hash IP address for privacy using SHA-256
 */
export function hashIP(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex");
}
