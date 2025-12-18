import Container from "@/components/core/container";
import Cards from "@/components/core/ness/cards";
import { getData } from "@/actions/add-actions";
import Header from "@/components/header";

async function page() {
  const data = await getData("ui library");

  return (
    <Container className="p-4 flex flex-col gap-4 h-fit border-b border-edge">
      <Header catagory={"ui library"} seeMore={false} />
          {data.map((item) => (
            <div key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <Cards
                title={item.title}
                description={item.description}
                githubUrl={item.githubUrl}
              />
            </div>
          ))}
    </Container>
  );
}

export default page;
