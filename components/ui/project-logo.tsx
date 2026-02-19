"use client";

import { useState } from "react";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProjectLogoProps {
  src?: string | null;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  fallbackText?: string; // First letter of project name for fallback
}

const sizeMap = {
  sm: 40,
  md: 64,
  lg: 96,
};

export default function ProjectLogo({
  src,
  alt,
  size = "md",
  className,
  fallbackText,
}: ProjectLogoProps) {
  const [imageError, setImageError] = useState(false);
  const pixelSize = sizeMap[size];

  // Show fallback if no src or image failed to load
  const showFallback = !src || imageError;

  if (showFallback) {
    // If fallbackText is provided, show first letter in colored circle
    if (fallbackText) {
      const firstLetter = fallbackText.charAt(0).toUpperCase();
      // Generate consistent color based on first letter
      const colorIndex =
        firstLetter.charCodeAt(0) % 6;
      const colors = [
        "bg-blue-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-orange-500",
        "bg-green-500",
        "bg-indigo-500",
      ];

      return (
        <div
          className={cn(
            "flex items-center justify-center rounded-lg font-bold text-white",
            colors[colorIndex],
            className
          )}
          style={{ width: pixelSize, height: pixelSize }}
        >
          <span style={{ fontSize: pixelSize * 0.5 }}>{firstLetter}</span>
        </div>
      );
    }

    // Default fallback: Package icon
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg bg-muted text-muted-foreground",
          className
        )}
        style={{ width: pixelSize, height: pixelSize }}
      >
        <Package size={pixelSize * 0.6} />
      </div>
    );
  }

  return (
    <div
      className={cn("relative rounded-lg overflow-hidden bg-muted", className)}
      style={{ width: pixelSize, height: pixelSize }}
    >
      <Image
        src={src}
        alt={alt}
        width={pixelSize}
        height={pixelSize}
        className="object-cover"
        onError={() => setImageError(true)}
        unoptimized // Since we're using external URLs
      />
    </div>
  );
}
