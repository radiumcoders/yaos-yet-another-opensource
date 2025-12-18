import Container from "@/components/core/container";
import { Badge } from "@/components/ui/badge";
import Cards from "../ness/cards";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { getData } from "@/actions/add-actions";
import Header from "@/components/header";


async function UiPart({ catagory }: { catagory: string }) {
  const data = await getData(catagory);

  return (
    <Container className="p-4 flex flex-col gap-4 h-fit border-b border-edge">
      <Header catagory={catagory} />
      <Carousel>
        <CarouselContent>
          {data.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <Cards
                title={item.title}
                description={item.description}
                githubUrl={item.githubUrl}
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
