"use client";
import { useQueryState } from "nuqs";
import Container from "./core/container";
import { Input } from "./ui/input";

export default function Search() {
  const [search, setSearch] = useQueryState("search");
  return (
    <Container>
      <Input
        placeholder="Enter Search Param"
        value={search ?? ""}
        onChange={(e) => setSearch(e.target.value.replace(/ /g, "-"))}
      />
    </Container>
  );
}
