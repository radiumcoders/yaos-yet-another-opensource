"use client";

import Container from "@/components/core/container";
import { Button } from "@/components/ui/button";
// import { createBucket } from "@/server/add-components";
// import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { House, Moon, Plus, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { toast } from "sonner";
 
function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();


  // Wait until component is mounted on client before rendering theme-dependent content
  useEffect(() => {
    setMounted(true);
  }, []);

    // const { mutate: CreateBucket } = useMutation({
    //   mutationFn: async () => {
    //     const res = await client.bucket.create.post();
    //     const bucketID = (await res.data!).bucketID;
    //     if (res.status === 200) {
    //       toast.success("Bucket created successfully!");
    //     }
    //   },
    // });

  return (
    <Container className="h-16 w-full border-b  border-x border-edge">
      <div className="h-full w-full flex items-center justify-between p-4">
        <div className="logo">
          <span onClick={() => router.push("/")} className="font-bold text-xl">
            YAOS
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            className="uppercase flex items-center gap-2"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {/* Prevent hydration mismatch by waiting for client-side mount */}
            {!mounted ? (
              <div className="h-5 w-5" />
            ) : theme === "dark" ? (
              <Sun />
            ) : (
              <Moon />
            )}
          </Button>
          <Button onClick={() => router.push("/")} variant={"outline"}>
            <House className="size-4" />
          </Button>
          {/* <Button onClick={() => CreateBucket()}> Create A Bucket</Button> */}
          <Button
            onClick={() => router.push("/add")}
            className="uppercase flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            add
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Navbar;
