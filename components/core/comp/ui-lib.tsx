import Container from "@/components/core/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Cards from "../ness/cards";

import { getData } from "@/server/add-actions";
import Header from "@/components/header";

async function UiPart({ catagory }: { catagory: string }) {
  const data = await getData(catagory);
  const isUi = catagory === "ui-library";
  return (
    <Container className="p-4 flex flex-col gap-4 h-fit border-b border-edge border-x-0">
      <Header catagory={catagory} seeMore={true} />
      <Carousel>
        <CarouselContent>
          {data.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <Cards
                title={item.title}
                description={item.description}
                githubUrl={item.githubUrl}
                isUi={isUi}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Container>
  );
}

export default UiPart;
