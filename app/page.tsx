import UiPart from "@/components/core/comp/ui-lib";
import Container from "@/components/core/container";
import Navbar from "@/components/core/navbar";

export default function Page() {
  return (
    <main className="h-full w-full">
      <UiPart catagory="ui library" />
      <UiPart catagory="portfolio-template" />
      <UiPart catagory="tool" />
      <UiPart catagory="other" />
    </main>
  );
}
