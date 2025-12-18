import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type CardsProps = {
  title: string;
  description: string;
  githubUrl: string;
};

function Cards({ title, description, githubUrl }: CardsProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-2xl font-bold truncate">{title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button className="w-full" variant="outline">
            visit
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}

export default Cards;
