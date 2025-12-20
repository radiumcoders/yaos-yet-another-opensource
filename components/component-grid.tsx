"use client";

import { Button } from "./ui/button";
import { toast } from "sonner";
import Container from "./core/container";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/client";

interface ComponentGridProps {
  names: string[];
  title?: string;
}

export default function ComponentGrid({ names, title }: ComponentGridProps) {
  const [selectedComponents, setSelectedComponents] = useState<string>("");

  const { mutate: addComponent } = useMutation({
    mutationFn: async ({
      name,
      bucketID,
    }: {
      name: string;
      bucketID: string;
    }) => {
      const body = {
        component: selectedComponents,
        bucketID,
      };
      const res = await client.bucket["add-component"].post({ body });
      if (res.status === 200) {
        toast.success(`Added ${name} to bucket!`);
      } else {
        toast.error(`Failed to add ${name} to bucket.`);
        console.log("Error adding component to bucket:", res);
      }
    },
  });

  function handleClick(name: string) {
    setSelectedComponents(name);
    toast.error(`Selected: ${name}`);
    const bucketID = localStorage.getItem("latestBucketID");
    if (bucketID) {
      addComponent({ name, bucketID });
    } else {
      toast.error("No bucket found. Please create a bucket first.");
    }
  }

  if (title === "React-bits") {
    return (
      <div>
        {names.map((name, index) => (
          <div key={`${name}-${index}`}></div>
        ))}
      </div>
    );
  }

  return (
    <Container className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {names.map((name, index) => (
        <Button
          onClick={() => handleClick(name)}
          variant={"outline"}
          className="border capitalize rounded w-full text-md shadow-sm hover:shadow-md transition-shadow"
          key={`${name}-${index}`}
        >
          {name}
        </Button>
      ))}
    </Container>
  );
}
