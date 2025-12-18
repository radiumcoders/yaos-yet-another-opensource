"use client";
import AddDataForm from "@/components/actions/add-data";
import Container from "@/components/core/container";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  return (
    <main className="flex flex-col h-full">
      <Container className="flex items-center h-8 mt-6  justify-between p-4">
        <span className="font-bold text-xl">YAOS</span>
        <Button className="uppercase" onClick={() => router.back()}>back</Button>
      </Container>
      <Container className="h-full flex-1 flex items-center justify-center">
        <AddDataForm />
      </Container>
    </main>
  );
}

export default page;
