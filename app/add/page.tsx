"use client";
import AddDataForm from "@/components/actions/add-data";
import Container from "@/components/core/container";

function page() {
  return (
    <main className="flex flex-col h-full">
      <Container className="h-full flex-1 flex items-center justify-center">
        <AddDataForm />
      </Container>
    </main>
  );
}

export default page;
