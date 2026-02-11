"use client";

import { useEffect, useRef, useState } from "react";
import { AnimationManager } from "@/lib/animation-manager";

interface FireASCIIAnimationProps {
  className?: string;
  fps?: number;
  showFrameCount?: boolean;
}

export default function FireASCIIAnimation({
  className = "",
  fps = 24,
  showFrameCount = false,
}: FireASCIIAnimationProps) {
  const [frames, setFrames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);
  const framesRef = useRef<string[]>([]);

  // Load frames from public/frames-fire folder
  useEffect(() => {
    const loadFrames = async () => {
      try {
        // Load all 300 frames from public/frames-fire folder (frame_0001.txt to frame_0300.txt)
        const frameFiles = Array.from(
          { length: 300 },
          (_, i) => `frame_${String(i + 1).padStart(4, "0")}.txt`,
        );

        const framePromises = frameFiles.map(async (filename) => {
          const response = await fetch(`/frames-fire/${filename}`);
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
        console.error("Failed to load fire ASCII frames:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFrames();
  }, []);

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
        <div className="animate-pulse text-emerald-500/50 text-center">Loading fire animation...</div>
      </div>
    );
  }

  if (frames.length === 0) {
    return (
      <div className={`relative font-mono whitespace-pre overflow-hidden ${className}`}>
        <div className="text-red-500/50 text-center">Failed to load fire frames</div>
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 font-mono whitespace-pre overflow-hidden ${className}`}>
      {showFrameCount && (
        <div className="text-emerald-500/70 mb-2 text-center">
          Frame: {currentFrame + 1}/{frames.length}
        </div>
      )}
      <div className="absolute inset-0 flex items-end justify-center">
        {frames[currentFrame]}
      </div>
    </div>
  );
}
