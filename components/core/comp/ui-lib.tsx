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

function UiPart({ badge }: { badge: string }) {
  return (
    <Container className="p-4 flex flex-col gap-4 h-fit border-b border-edge">
      <div className="flex  items-center w-full justify-between gap-2">
        <Badge className="uppercase">{badge}</Badge>
        <Button size="sm">See more</Button>
      </div>
      <Carousel>
        <CarouselContent>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Cards />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Cards />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Cards />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Cards />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Container>
  );
}

export default UiPart;
