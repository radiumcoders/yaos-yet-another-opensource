"use client";
import AddDataForm from "@/components/actions/add-data";
import Container from "@/components/core/container";
import { Suspense } from "react";

function page() {
  return (
    <main className="flex flex-col h-full">
      <Container className="h-full flex-1 flex items-center justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <AddDataForm />
        </Suspense>
      </Container>
    </main>
  );
}

export default page;
