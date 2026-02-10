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

function Navbar() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="w-full h-fit border-b border-border ">
      <div className="flex items-center justify-between gap-4 h-16 w-full max-w-7xl mx-auto">
        {/* logo */}
        <Link href="/">
          {theme === "light" ? (
            <Image src="/logo.svg" alt="Logo" width={50} height={50} />
          ) : (
            <Image src="/logo-dark.svg" alt="Logo" width={50} height={50} />
          )}
        </Link>
        {/* middle links */}
        <div className="flex items-center justify-center gap-4">
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
        <div>
          {/* theme toggle and more */}
          <div className="flex items-center justify-center gap-2">
            {/* todo: redirect to the github repo :D */}
            <Link href={"https://github.com/"}>
              <Button size={"icon-lg"}>
                <GithubLogoIcon size={32} />
              </Button>
            </Link>

            <Link href={"https://x.com/radiumcoders"}>
              <Button size={"icon-lg"}>
                <XLogoIcon size={32} />
              </Button>
            </Link>

            <Button
              size={"icon-lg"}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
