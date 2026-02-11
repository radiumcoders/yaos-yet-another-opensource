import Container from "@/components/core/container";
import Navbar from "@/components/core/navbar";
import FireASCIIAnimation from "@/components/fire-ascii-animation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      {/* Fire ASCII Animation Background - Full Screen */}
      <Container className="fixed inset-0 w-screen h-screen pointer-events-none flex items-center justify-end z-0 overflow-hidden">
        <FireASCIIAnimation
          fps={30}
          className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-none text-emerald-500/60"
        />
      </Container>
      <Container className="relative h-screen z-10 max-w-7xl mx-auto px-4 border-x border-border w-full">
        <Navbar />
        {/* HERO TEXT */}
        <div className="pt-8 sm:pt-12 md:pt-16 pb-4 sm:pb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-geist-pixel-square">
          <h1>
            The <span className="text-emerald-500">Open Source Collection</span>{" "}
            You've Been Looking For.
          </h1>
        </div>

        {/* Hero Description */}
        <p className="pb-6 sm:pb-8 font-geist-pixel-grid text-sm sm:text-base">
          A handpicked collection of open-source UI libraries, portfolio
          templates, tools, and resources to accelerate your next project. All
          free. All open.
        </p>

        {/* CTA Buttons */}
        <div className="relative pb-8 sm:pb-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="/libs">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 py-6 text-md font-geist-pixel-square relative z-10"
              >
                Explore Collection
              </Button>
            </Link>
            <Link href="/submit">
              <Button
                size="lg"
                variant="outline"
                className="w-full bg-background sm:w-auto px-8 py-6 text-md font-geist-pixel-square font-medium relative z-10"
              >
                Add to List
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
