import Container from "@/components/core/container";
import Navbar from "@/components/core/navbar";

import LightRays from "@/components/LightRays";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      {/* Light Rays Background - Dark mode only */}
      <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0 hidden dark:block">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={1}
          followMouse={false}
          mouseInfluence={0.1}
          noiseAmount={0.5}
          distortion={0.12}
          className="custom-rays"
          pulsating={false}
          fadeDistance={3}
          saturation={1}
        />
      </div>
      <Container className="relative h-screen z-10 max-w-7xl mx-auto px-4 w-full flex flex-col ">
        <Navbar />
        <div className="flex-1 flex flex-col justify-start pt-6">
          {/* HERO TEXT */}
          <div className="pb-4 sm:pb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bricolage-grotesque">
            <h1>The Open Source Collection You've Been Looking For.</h1>
          </div>

          {/* CTA Buttons */}
          <div className="pb-8 sm:pb-10">
            <div className="flex flex-col sm:flex-row items-start justify-start gap-3 sm:gap-4">
              <Link href="/libs">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-2 py-6 text-md font-geist-pixel-square relative z-10"
                >
                  Explore Collection
                </Button>
              </Link>
              <Link href="/tools">
                <Button
                  size="lg"
                  variant={"outline"}
                  className="w-full bg-background dark:bg-background hover:bg-background/80 sm:w-auto px-2 py-6 text-md font-geist-pixel-square font-medium relative z-10"
                >
                  Explore Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
