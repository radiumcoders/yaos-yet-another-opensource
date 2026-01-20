"use client";

import Container from "@/components/core/container";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { generateCommand } from "@/server/generate-command";
import { X } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import * as React from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
interface ComponentNameProps {
  name: Array<string>;
  rigName: string;
}

const Grid: React.FC<ComponentNameProps> = ({ name, rigName }) => {
  const [selectedItems, setSelectedItems] = useQueryState(
    "selected",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [generatedCommand, setGeneratedCommand] = React.useState("");
  const [isOverlayOpen, setIsOverlayOpen] = React.useState(false);
  const [npmClient, setNpmClient] = useQueryState(
    "npmClient",
    parseAsString.withDefault("npm")
  );

  const toggleSelection = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  React.useEffect(() => {
    async function fetchCommand() {
      if (selectedItems.length === 0) {
        setGeneratedCommand("");
        return;
      }
      const command = await generateCommand({
        components: selectedItems,
        rigName,
        npm: npmClient
      });
      setGeneratedCommand(command);
    }
    fetchCommand();
  }, [selectedItems, rigName, npmClient]);

  return (
    <>
      <Container className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Components:</h2>
        <Button
          disabled={selectedItems.length === 0}
          onClick={() => setIsOverlayOpen(true)}
        >
          View Command
        </Button>
      </Container>
      <Container className="grid grid-cols-3 gap-3">
        {name.map((item, index) => (
          <Button
            className="text-md text-center"
            variant={selectedItems.includes(item) ? "default" : "outline"}
            key={`${item}-${index}`}
            onClick={() => toggleSelection(item)}
          >
            <span className="truncate block w-full">{item}</span>
          </Button>
        ))}

        <AlertDialog open={isOverlayOpen} onOpenChange={setIsOverlayOpen}>
          <AlertDialogContent className="max-w-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center justify-between w-full">
                Generated Command{" "}
                <Button
                  size={"icon"}
                  onClick={() => {
                    setIsOverlayOpen(false);
                  }}
                  className="ml-4"
                >
                  <X />
                </Button>
              </AlertDialogTitle>
              <div className="flex gap-2 my-4">
                <Button variant="outline" size="sm" onClick={() => setNpmClient("npx")}>npm</Button>
                <Button variant="outline" size="sm" onClick={() => setNpmClient("pnpx dlx")}>pnpm</Button>
                <Button variant="outline" size="sm" onClick={() => setNpmClient("bun x --bun")}>bun</Button>
              </div>
              <AlertDialogDescription className="space-y-4">
                <span className="block">
                  Copy the command below to install your selected components:
                </span>
                <span className="block p-4 rounded-lg">
                  <code className="text-sm break-all font-mono">
                    {generatedCommand}
                  </code>
                </span>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedCommand);
                    toast.success("Command copied to clipboard!");
                  }}
                  className="w-full"
                >
                  Copy to Clipboard
                </Button>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </Container>
    </>
  );
};

export default Grid;
