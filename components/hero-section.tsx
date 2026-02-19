"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import AddDataForm from "@/components/forms/add-data-form";
import { useState } from "react";

export default function HeroSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col justify-start pt-6">
      {/* HERO TEXT */}
      <div className="pb-4 sm:pb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bridge">
        <h1>The Open Source Collection You've Been Looking For.</h1>
      </div>

      {/* CTA Buttons */}
      <div className="pb-8 sm:pb-10">
        <div className="flex flex-row  items-start justify-start gap-3 sm:gap-4">
          <Link href="/data">
            <Button
              size="lg"
              variant={"default"}
              className="w-full sm:w-auto px-2 py-6 text-md font-geist-pixel-square relative z-10 "
            >
              Explore Collection
            </Button>
          </Link>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              render={
                <Button
                  size="lg"
                  variant={"outline"}
                  className="w-fit sm:w-auto px-2 py-6 text-md font-geist-pixel-square relative z-10 bg-background"
                />
              }
            >
              Add New :D
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bridge">
                  Add New Item
                </DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new item to the collection.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <AddDataForm onSuccess={() => setOpen(false)} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
