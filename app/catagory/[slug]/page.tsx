import { getData } from "@/server/add-actions";
import Container from "@/components/core/container";
import Cards from "@/components/core/ness/cards";
import Header from "@/components/header";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getData(slug);

  return (
    <Container className="p-4 flex flex-col gap-4 h-fit border-b border-edge">
      <Header catagory={slug} seeMore={false} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id}>
            <Cards
              title={item.title}
              description={item.description}
              githubUrl={item.githubUrl}
              isUi={slug === "ui-library"}
            />
          </div>
        ))}
      </div>
    </Container>
  );
}
