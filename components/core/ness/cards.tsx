import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Cards() {
  return (
    <Card className="overflow-hidden">
      <img
        src="https://placehold.co/600x400"
        alt="Card Image"
        className="w-full aspect-video object-cover"
      />
      <CardHeader>
        <CardTitle className="text-2xl font-bold">title</CardTitle>
        <CardDescription>
          description
          ............................................................
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" variant="outline">
          visit
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Cards;
