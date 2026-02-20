"use client";

import { useEffect, useState } from "react";

export default function BackgroundGradient() {
  const [gradientEnabled, setGradientEnabled] = useState(true);

  useEffect(() => {
    // Check localStorage on mount
    const stored = localStorage.getItem("gradient-enabled");
    if (stored !== null) {
      setGradientEnabled(stored === "true");
    }

    // Listen for gradient changes
    const handleGradientChange = (e: CustomEvent<boolean>) => {
      // Use setTimeout to avoid updating state during render
      setTimeout(() => {
        setGradientEnabled(e.detail);
      }, 0);
    };

    window.addEventListener("gradient-change", handleGradientChange as EventListener);

    return () => {
      window.removeEventListener("gradient-change", handleGradientChange as EventListener);
    };
  }, []);

  if (!gradientEnabled) return null;

  return (
    <>
      {/* Soft Blue Radial Background - Light Mode */}
      <div
        className="fixed inset-0 z-0 dark:hidden"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(circle at top center, rgba(59, 130, 246, 0.5), transparent 70%)
          `,
        }}
      />
      {/* Soft Blue Radial Background - Dark Mode */}
      <div
        className="fixed inset-0 z-0 dark:block hidden"
        style={{
          background: "#09090b",
          backgroundImage: `
            radial-gradient(circle at top center, rgba(59, 130, 246, 0.4), transparent 70%)
          `,
        }}
      />
    </>
  );
}
