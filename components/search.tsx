"use client";
import { useState } from "react";
import { useQueryState } from "nuqs";
import Container from "./core/container";
import { Input } from "./ui/input";
import Cards from "./core/ness/cards";
import { getDataBySearch } from "@/server/add-actions";

interface SearchData {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
}

interface SearchProps {
  slug: string;
}

export default function Search({ slug }: SearchProps) {
  const [search, setSearch] = useQueryState("search");
  const [inputValue, setInputValue] = useState(search ?? "");
  const [searchData, setSearchData] = useState<SearchData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!inputValue.trim()) {
      setSearchData([]);
      setSearch(null);
      return;
    }

    setIsLoading(true);
    try {
      const data = await getDataBySearch(inputValue.replace(/ /g, "-"));
      setSearchData(data);
      setSearch(inputValue.replace(/ /g, "-"));
    } catch (error) {
      console.error("Search failed:", error);
      setSearchData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <Container>
        <Input
          placeholder="Enter Search Param (Press Enter to search plsss)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
      </Container>

      {search && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-4">
            {isLoading ? "Searching..." : "Search Results"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {searchData.map((item) => (
              <div key={item.id}>
                <Cards
                  title={item.title}
                  description={item.description}
                  githubUrl={item.githubUrl}
                  isUi={slug === "ui-library"}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
