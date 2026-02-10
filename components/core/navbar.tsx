"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import {
  GithubLogoIcon,
  MoonIcon,
  SunIcon,
  XLogoIcon,
  List,
  X,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useState, useEffect } from "react";

function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="z-50 bg-background">
      <div className="w-full h-fit border-b border-border font-geist-pixel-circle">
        <div className="flex items-center justify-between gap-4 h-16 w-full max-w-7xl mx-auto px-4">
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
          <div className="hidden md:flex items-center justify-center gap-4">
            <Link href={"/"} className="text-sm font-medium">
              Home
            </Link>
            <Link href={"/libs"} className="text-sm font-medium">
              Libraries
            </Link>
            <Link href={"/tools"} className="text-sm font-medium">
              Tools
            </Link>
            <Link href={"/other"} className="text-sm font-medium">
              Other
            </Link>
          </div>

          {/* theme toggle and more */}
          <div className="flex items-center justify-center gap-2">
            {/* todo: redirect to the github repo :D */}
            <Link href={"https://github.com/"} className="hidden md:inline-block">
              <Button size={"icon-lg"} variant="outline">
                <GithubLogoIcon size={32} />
              </Button>
            </Link>

            <Link href={"https://x.com/radiumcoders"} className="hidden md:inline-block">
              <Button size={"icon-lg"} variant="outline">
                <XLogoIcon size={32} />
              </Button>
            </Link>

            <Button
              size={"icon-lg"}
              variant="outline"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="hidden md:flex"
            >
              {!mounted ? <SunIcon /> : theme === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            {/* Mobile menu button */}
            <Button
              size={"icon-lg"}
              variant="outline"
              onClick={toggleMobileMenu}
              className="md:hidden"
            >
              <List size={32} />
            </Button>
          </div>
        </div>
      </div>

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-background md:hidden transition-all duration-300 ease-in-out font-geist-pixel-circle ${
          isMobileMenuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile menu header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            <Link href="/" onClick={closeMobileMenu}>
              {!mounted ? (
                <Image src="/logo.svg" alt="Logo" width={50} height={50} />
              ) : theme === "light" ? (
                <Image src="/logo.svg" alt="Logo" width={50} height={50} />
              ) : (
                <Image src="/logo-dark.svg" alt="Logo" width={50} height={50} />
              )}
            </Link>
            <Button size={"icon-lg"} variant="outline" onClick={closeMobileMenu}>
              <X size={32} />
            </Button>
          </div>

          {/* Mobile menu content */}
          <div className="flex flex-col items-center justify-center flex-1 gap-8 p-8">
            <Link
              href={"/"}
              className="text-2xl font-medium transition-transform duration-200 hover:scale-110"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              href={"/libs"}
              className="text-2xl font-medium transition-transform duration-200 hover:scale-110"
              onClick={closeMobileMenu}
            >
              Libraries
            </Link>
            <Link
              href={"/tools"}
              className="text-2xl font-medium transition-transform duration-200 hover:scale-110"
              onClick={closeMobileMenu}
            >
              Tools
            </Link>
            <Link
              href={"/other"}
              className="text-2xl font-medium transition-transform duration-200 hover:scale-110"
              onClick={closeMobileMenu}
            >
              Other
            </Link>

            {/* Social links in mobile menu */}
            <div className="flex items-center gap-4 mt-8">
              <Link href={"https://github.com/"} onClick={closeMobileMenu}>
                <Button size={"icon-lg"} variant="outline">
                  <GithubLogoIcon size={32} />
                </Button>
              </Link>

              <Link href={"https://x.com/radiumcoders"} onClick={closeMobileMenu}>
                <Button size={"icon-lg"} variant="outline">
                  <XLogoIcon size={32} />
                </Button>
              </Link>

              <Button
                size={"icon-lg"}
                variant="outline"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {!mounted ? <SunIcon /> : theme === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
