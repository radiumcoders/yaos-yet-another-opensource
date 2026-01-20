"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CardsProps = {
  title: string;
  description: string;
  githubUrl: string;
  isUi?: boolean;
};

function Cards({ title, description, githubUrl, isUi }: CardsProps) {
  const router = useRouter();
  
  return (
    <Card className="overflow-hidden h-full border-x-0 flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-2xl font-bold truncate">{title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
          <div className="flex flex-col gap-2 w-full">
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button className="w-full" variant="outline">
              visit
            </Button>
          </Link>
          {isUi && (
            <Button onClick={() => router.push(`/components/${title}`)} className="w-full" variant="outline">
              view components list
            </Button>
          )}
          </div>
      </CardFooter>
    </Card>
  );
}

export default Cards;
