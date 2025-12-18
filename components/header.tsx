"use client"
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function Header({ catagory , seeMore }: { catagory: string , seeMore?: boolean }) {
  const router = useRouter();
  return (
    <div className="flex  items-center w-full justify-between gap-2">
      <Badge className="uppercase">{catagory}</Badge>
      {seeMore && <Button size="sm" onClick={() => router.push(`/catagory/${catagory}`)}>See more</Button>}
      {!seeMore && <Button size="sm" onClick={() => router.push(`/`)}>Go Home</Button>}
    </div>
  );
}

export default Header;
