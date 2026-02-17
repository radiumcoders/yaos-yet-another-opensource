"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import {
  GithubLogoIcon,
  MoonIcon,
  SunIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    // Initialize audio element with MyInstants hosted MP3
    audioRef.current = new Audio(
      "https://www.myinstants.com/media/sounds/rickroll-but-short.mp3",
    );
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    // Play audio
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((err) => console.log("Audio play failed:", err));
      }

      // Stop audio after 1 second (matching animation duration)
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }, 1000);
    }

    // @ts-ignore
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    // @ts-ignore
    document.startViewTransition(() => {
      setTheme(newTheme);
    });
  };

  return (
    <nav className="z-50 bg-background/50 backdrop-blur-sm ring ring-ring/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-full rounded-xl my-2 ">
      <div className="w-full h-fit font-geist-pixel-circle">
        <div className="flex items-center justify-between gap-4 py-1 w-full max-w-7xl mx-auto px-4">
          {/* logo */}
          <Link href="/">
            {!mounted ? (
              <Image src="/logo.svg" alt="Logo" width={50} height={50} />
            ) : theme === "light" ? (
              <Image src="/logo.svg" alt="Logo" width={50} height={50} />
            ) : (
              <Image src="/logo-dark.svg" alt="Logo" width={50} height={50} />
            )}
          </Link>

          {/* middle links */}
          <div className="font-geist-pixel-square flex items-center justify-center gap-4">
            <Link href={"/"} className="text-sm ">
              Home
            </Link>
            <Link href={"/libs"} className="text-sm">
              Libraries
            </Link>
            <Link href={"/tools"} className="text-sm">
              Tools
            </Link>
            <Link href={"/other"} className="text-sm">
              Other
            </Link>
          </div>

          {/* theme toggle and more */}
          <div className="flex items-center justify-center gap-2">
            {/* todo: redirect to the github repo :D */}
            <Link href={"https://github.com/radiumcoders/YAOS-v2"}>
              <Button size={"icon-lg"} variant="outline">
                <GithubLogoIcon size={32} />
              </Button>
            </Link>

            <Link href={"https://x.com/radiumcoders"}>
              <Button size={"icon-lg"} variant="outline">
                <XLogoIcon size={32} />
              </Button>
            </Link>

            <Button size={"icon-lg"} variant="outline" onClick={toggleTheme}>
              {!mounted ? (
                <SunIcon />
              ) : theme === "light" ? (
                <MoonIcon />
              ) : (
                <SunIcon />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
