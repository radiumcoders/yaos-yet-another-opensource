import UiPart from "@/components/core/comp/ui-lib";
import Container from "@/components/core/container";
import Navbar from "@/components/core/navbar";

export default function Page() {
  return (
    <main className="h-full w-full">
      <header className="w-full">
        <Navbar />
        <Container>
          <div className="h-8 border-b border-edge w-full text-primary/10 flex items-center justify-center">
            <span>YAOS - yet another open source</span>
          </div>
        </Container>
      </header>
      <UiPart catagory="ui library" />
      <UiPart catagory="portfolio-template" />
      <UiPart catagory="tool" />
      <UiPart catagory="other" />
    </main>
  );
}
