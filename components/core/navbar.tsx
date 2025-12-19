"use client";

import Container from "@/components/core/container";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { House, LogIn, Moon, Plus, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // Wait until component is mounted on client before rendering theme-dependent content
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Container className="h-16 w-full border-b  border-x border-edge">
      <div className="h-full w-full flex items-center justify-between p-4">
        <div className="logo">
          <span onClick={() => router.push("/")} className="font-bold text-xl">
            YAOS
          </span>
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
          <Button onClick={() => router.push("/")} variant={"outline"}>
            <House className="size-4" />
          </Button>
          {/* Replace false with your actual auth check, e.g., !!user or isAuthenticated */}
          {isPending ? (
            <Button
              onClick={() => {
                // Add your sign-out logic here
              }}
              variant={"secondary"}
              className="uppercase flex items-center gap-2"
            >
              Logged In
            </Button>
          ) : (
            <Button
              onClick={() => {
                router.push("/sign-in");
              }}
              variant={"secondary"}
              className="uppercase flex items-center gap-2"
            >
              <LogIn /> Sign In
            </Button>
          )}
          <Button
            onClick={() => router.push("/add")}
            className="uppercase flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            add
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Navbar;
