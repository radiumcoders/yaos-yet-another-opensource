
import UiPart from "@/components/core/comp/ui-lib";

export default function Page() {

  return (
    <main className="h-full w-full">
      <UiPart catagory="ui-library" />
      <UiPart catagory="portfolio-template" />
      <UiPart catagory="tool" />
      <UiPart catagory="other" />
    </main>
  );
}
