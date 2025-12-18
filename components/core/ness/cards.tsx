import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

function Cards() {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">ShadCN UI</CardTitle>
        <CardDescription>
          The Foundation for your Design System A set of beautifully designed
          components that you can customize, extend, and build on. Start here
          then make it your own. Open Source. Open Code.
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
