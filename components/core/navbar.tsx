"use client";

import Container from "@/components/core/container";
import { Button } from "@/components/ui/button";
import { House, Moon, Plus, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  //store the username in a state
  const [username, setUsername] = useState("");
  //allow only 3 refreshes of the username
  const [refreshed, setRefreshed] = useState(0);
  useEffect(() => {
    function main() {
      //check if the username is already stored in the local storage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        //set the username from the local storage is exists and return :]
        setUsername(stored);
      }
      //generate a new username and store it to localstorage ;]
      const generated = generateRandomUsername();
      localStorage.setItem(STORAGE_KEY, generated);
      setUsername(generated);
    }

    main();
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
          <Button onClick={() => router.push("/")} variant={"secondary"}>
            <House className="size-4" />
          </Button>
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
