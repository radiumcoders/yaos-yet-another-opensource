"use client";

import { useEffect, useState } from "react";

export function useGradient() {
  const [gradientEnabled, setGradientEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("gradient-enabled");
    if (stored !== null) {
      setGradientEnabled(stored === "true");
    }
  }, []);

  const toggleGradient = () => {
    setGradientEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem("gradient-enabled", String(newValue));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent("gradient-change", { detail: newValue }));
      return newValue;
    });
  };

  return { gradientEnabled, toggleGradient, mounted };
}
