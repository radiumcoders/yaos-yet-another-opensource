"use client";

import { useEffect, useRef, useState } from "react";
import { AnimationManager } from "@/lib/animation-manager";

interface ASCIIAnimationProps {
  frames?: string[];
  className?: string;
  fps?: number;
  colorOverlay?: boolean;
  showFrameCount?: boolean;
}

export default function ASCIIAnimation({
  frames: providedFrames,
  className = "",
  fps = 24,
  colorOverlay = false,
  showFrameCount = false,
}: ASCIIAnimationProps) {
  const [frames, setFrames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);
  const framesRef = useRef<string[]>([]);

  // Load frames from public/ascii folder
  useEffect(() => {
    const loadFrames = async () => {
      if (providedFrames) {
        setFrames(providedFrames);
        framesRef.current = providedFrames;
        setIsLoading(false);
        return;
      }

      try {
        // Load 61 frames from public/ascii folder
        const frameFiles = Array.from(
          { length: 61 },
          (_, i) => `frame_${String(i + 1).padStart(4, "0")}.txt`,
        );

        const framePromises = frameFiles.map(async (filename) => {
          const response = await fetch(`/ascii/${filename}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${filename}: ${response.status}`);
          }
          return await response.text();
        });

        const loadedFrames = await Promise.all(framePromises);
        setFrames(loadedFrames);
        framesRef.current = loadedFrames;
        setCurrentFrame(0);
      } catch (error) {
        console.error("Failed to load ASCII frames:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFrames();
  }, [providedFrames]);

  // Create animation manager
  const [animationManager] = useState(
    () =>
      new AnimationManager(() => {
        setCurrentFrame((current) => {
          if (framesRef.current.length === 0) return current;
          return (current + 1) % framesRef.current.length;
        });
      }, fps),
  );

  // Handle animation lifecycle
  useEffect(() => {
    if (frames.length === 0) return;

    const reducedMotion =
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

    if (reducedMotion) {
      return;
    }

    const handleFocus = () => animationManager.start();
    const handleBlur = () => animationManager.pause();

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    if (document.visibilityState === "visible") {
      animationManager.start();
    }

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      animationManager.pause();
    };
  }, [animationManager, frames.length]);

  if (isLoading) {
    return (
      <div className={`relative font-mono whitespace-pre overflow-hidden ${className}`}>
        <div className="animate-pulse text-neutral-700 text-center">Loading ASCII animation...</div>
      </div>
    );
  }

  if (frames.length === 0) {
    return (
      <div className={`relative font-mono whitespace-pre overflow-hidden ${className}`}>
        <div className="text-neutral-700  text-center">Failed to load ASCII frames</div>
      </div>
    );
  }

  return (
    <div className={`relative font-mono whitespace-pre overflow-hidden ${className}`}>
      {showFrameCount && (
        <div className="text-neutral-700 mb-2 text-center">
          Frame: {currentFrame + 1}/{frames.length}
        </div>
      )}
      <div className="relative text-neutral-700">
        {frames[currentFrame]}
      </div>
    </div>
  );
}
