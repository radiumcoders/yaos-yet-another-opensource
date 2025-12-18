import Container from "@/components/core/container";
import Cards from "@/components/core/ness/cards";
import { getData } from "@/actions/add-actions";
import Header from "@/components/header";

async function page() {
  const data = await getData("other");

  return (
    <Container className="p-4 flex flex-col gap-4 h-fit border-b border-edge">
      <Header catagory={"other"} seeMore={false} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id}>
            <Cards
              title={item.title}
              description={item.description}
              githubUrl={item.githubUrl}
            />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default page;
