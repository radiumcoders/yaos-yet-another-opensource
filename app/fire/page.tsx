import FireASCIIAnimation from "@/components/fire-ascii-animation";

export default function FirePage() {
  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden flex items-center justify-center bg-black">
      <FireASCIIAnimation
        fps={30}
        className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-tight text-orange-500"
      />
    </main>
  );
}
