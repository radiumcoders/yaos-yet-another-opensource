"use client";

import * as React from "react";
import { Button } from "./ui/button";
import Container from "@/components/core/container";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { generateCommand } from "@/server/generate-command";
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

  const toggleSelection = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <>
      <Container className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Components:</h2>
        <Button
          onClick={() => {
            const res = generateCommand({ components: selectedItems, rigName });
            res.then((command) => setGeneratedCommand(command));
          }}
          disabled={selectedItems.length === 0}
        >
          Generate Command
        </Button>
      </Container>
      <Container className="grid grid-cols-3 gap-3">
        {name.map((item, index) => (
          <Button
            className="grid-cols-1 text-md"
            variant={selectedItems.includes(item) ? "default" : "outline"}
            key={`${item}-${index}`}
            onClick={() => toggleSelection(item)}
          >
            {item}
          </Button>
        ))}
      </Container>
      <Container className="mt-4 p-4 rounded">
        <h3 className="text-lg font-medium mb-2">Generated Command:</h3>
        <pre className="whitespace-pre-wrap break-words">{generatedCommand}</pre>
      </Container>
    </>
  );
};

export default Grid;
