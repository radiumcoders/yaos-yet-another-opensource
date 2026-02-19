"use client";
import {
  GithubLogoIcon,
  ListIcon,
  MoonIcon,
  SunIcon,
  XIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, domAnimation, LazyMotion, m } from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

enum SocialLinks {
  Github = "https://github.com/radiumcoders/yaos-yet-another-opensource",
  X = "https://x.com/radiumcoders",
}

const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Libraries",
    href: "/libs",
  },
  {
    label: "RawData",
    href: "/data",
  },
];

function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <>
      <nav className="z-50 bg-background/50 dark:bg-background/90 backdrop-blur-sm ring ring-ring/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-full rounded-xl my-2 border border-white/20 dark:border-white/10">
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

            {/* middle links - hidden on mobile */}
            <div className="font-geist-pixel-square hidden md:flex items-center justify-center gap-4">
              {links.map((link) => {
                return (
                  <Link key={link.href} href={link.href} className="text-sm ">
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* theme toggle and more - hidden on mobile */}
            <div className="hidden md:flex items-center justify-center gap-2">
              <Link href={SocialLinks.Github}>
                <Button size={"icon-lg"} variant="ghost">
                  <GithubLogoIcon size={32} />
                </Button>
              </Link>

              <Link href={SocialLinks.X}>
                <Button size={"icon-lg"} variant="ghost">
                  <XLogoIcon size={32} />
                </Button>
              </Link>

              <Button size={"icon-lg"} variant="ghost" onClick={toggleTheme}>
                {!mounted ? (
                  <SunIcon />
                ) : theme === "light" ? (
                  <MoonIcon />
                ) : (
                  <SunIcon />
                )}
              </Button>
            </div>

            {/* hamburger menu - visible only on mobile */}
            <Button
              size={"icon-lg"}
              variant="outline"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <ListIcon size={32} />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {mobileMenuOpen && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="fixed inset-0 z-9999 bg-background flex flex-col items-center justify-center gap-4 md:hidden"
            >
              {/* Close button */}
              <Button
                size={"icon-lg"}
                variant="ghost"
                className="absolute top-4 right-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XIcon size={32} />
              </Button>

              {/* Links */}
              {links.map((link) => {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-geist-pixel-circle text-3xl"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Social links and theme toggle */}
              <div className="flex items-center justify-center gap-4">
                <Link href={SocialLinks.Github}>
                  <Button size={"icon-lg"} variant="ghost">
                    <GithubLogoIcon size={32} />
                  </Button>
                </Link>

                <Link href={SocialLinks.X}>
                  <Button size={"icon-lg"} variant="ghost">
                    <XLogoIcon size={32} />
                  </Button>
                </Link>

                <Button
                  size={"icon-lg"}
                  variant="ghost"
                  onClick={toggleTheme}
                >
                  {!mounted ? (
                    <SunIcon />
                  ) : theme === "light" ? (
                    <MoonIcon />
                  ) : (
                    <SunIcon />
                  )}
                </Button>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </>
  );
}

export default Navbar;

