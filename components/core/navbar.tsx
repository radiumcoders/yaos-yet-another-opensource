"use client";

import { useEffect, useState } from "react";
import Container from "@/components/core/container";
import { Button } from "@/components/ui/button";
import { Moon, Plus, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Wait until component is mounted on client before rendering theme-dependent content
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Container className="h-16 w-full border-b border-x-0 border-edge">
      <div className="h-full w-full flex items-center justify-between p-4">
        <div className="logo">
          <span className="font-bold text-xl">YAOS</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            className="uppercase flex items-center gap-2"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {/* Prevent hydration mismatch by waiting for client-side mount */}
            {!mounted ? (
              <div className="h-5 w-5" />
            ) : theme === "dark" ? (
              <Sun />
            ) : (
              <Moon />
            )}
          </Button>
          <Button onClick={() => router.push("/add")} className="uppercase flex items-center gap-2">
            <Plus className="h-4 w-4" />
            add
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Navbar;
