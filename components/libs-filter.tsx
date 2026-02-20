"use client";

import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
  TagsTrigger,
  TagsValue,
} from "@/components/kibo-ui/tags";
import RatingWidget from "@/components/rating-widget";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ProjectLogo from "@/components/ui/project-logo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GithubLogoIcon,
  GlobeIcon,
  MagnifyingGlassIcon,
  X,
  XIcon,
} from "@phosphor-icons/react";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export type Library = {
  id: string;
  title: string;
  description: string;
  github_url: string;
  live_url: string;
  logo_url: string | null;
  tags: string[];
  average_rating: string | null;
  total_ratings: number | null;
};

type SortOption = "rating" | "newest" | "alphabetical";

interface LibsFilterProps {
  libraries: Library[];
}

export default function LibsFilter({ libraries }: LibsFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [tagPickerOpen, setTagPickerOpen] = useState(false);

  // Get all unique tags from all libraries
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    libraries.forEach((lib) => {
      lib.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [libraries]);

  // Normalize string for fuzzy search (remove spaces, hyphens, lowercase)
  const normalizeString = (str: string) => {
    return str.toLowerCase().replace(/[\s\-_]/g, "");
  };

  // Filter and sort libraries
  const filteredLibraries = useMemo(() => {
    let filtered = libraries;

    // Filter by search query with fuzzy matching
    if (searchQuery.trim()) {
      const normalizedQuery = normalizeString(searchQuery);
      const originalQuery = searchQuery.toLowerCase();

      filtered = filtered.filter((lib) => {
        const normalizedTitle = normalizeString(lib.title);
        const normalizedDesc = normalizeString(lib.description);
        const originalTitle = lib.title.toLowerCase();
        const originalDesc = lib.description.toLowerCase();

        // Match either normalized (fuzzy) or original (exact with spaces/hyphens)
        return (
          normalizedTitle.includes(normalizedQuery) ||
          normalizedDesc.includes(normalizedQuery) ||
          originalTitle.includes(originalQuery) ||
          originalDesc.includes(originalQuery)
        );
      });
    }

    // Filter by selected tags (OR logic - show if library has ANY of the selected tags)
    if (selectedTags.length > 0) {
      filtered = filtered.filter((lib) =>
        selectedTags.some((tag) => lib.tags.includes(tag)),
      );
    }

    // Sort libraries
    const sorted = [...filtered];
    switch (sortBy) {
      case "rating":
        sorted.sort((a, b) => {
          const ratingA = parseFloat(a.average_rating || "0");
          const ratingB = parseFloat(b.average_rating || "0");
          const countA = a.total_ratings || 0;
          const countB = b.total_ratings || 0;
          return ratingB - ratingA || countB - countA;
        });
        break;
      case "newest":
        // For now, keep original order (would need created_at in schema)
        break;
      case "alphabetical":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return sorted;
  }, [libraries, searchQuery, selectedTags, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSortBy("rating");
  };

  const hasActiveFilters = searchQuery.trim() || selectedTags.length > 0;

  return (
    <div className="space-y-6">
      {/* Filter Controls - Single Row */}
      <div className="space-y-4">
        {/* Search, Filter, and Sort in One Row */}
        <div className="flex flex-col lg:flex-row gap-3 items-stretch">
          {/* Search Bar */}
          <div className="relative w-full flex-1 lg:w-[400px]">
            <MagnifyingGlassIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              type="text"
              placeholder="Search libraries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-10 bg-background"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Tag Filter */}
          <div className="w-full lg:w-[300px]">
            <Tags open={tagPickerOpen} onOpenChange={setTagPickerOpen}>
              <TagsTrigger className="h-10 min-h-10 bg-background hover:bg-background w-full">
                {selectedTags.length > 0 ? (
                  selectedTags.map((tag) => (
                    <TagsValue
                      key={tag}
                      onRemove={() => {
                        setSelectedTags(selectedTags.filter((t) => t !== tag));
                      }}
                    >
                      {tag}
                    </TagsValue>
                  ))
                ) : (
                  <span className="text-muted-foreground"></span>
                )}
              </TagsTrigger>
              <TagsContent>
                <TagsInput placeholder="" />
                <TagsList>
                  <TagsEmpty>No tags found.</TagsEmpty>
                  <TagsGroup>
                    {allTags.map((tag) => (
                      <TagsItem
                        key={tag}
                        value={tag}
                        onSelect={() => {
                          const newTags = selectedTags.includes(tag)
                            ? selectedTags.filter((t) => t !== tag)
                            : [...selectedTags, tag];
                          setSelectedTags(newTags);
                        }}
                      >
                        <span>{tag}</span>
                        {selectedTags.includes(tag) && <CheckIcon size={16} />}
                      </TagsItem>
                    ))}
                  </TagsGroup>
                </TagsList>
              </TagsContent>
            </Tags>
          </div>
          <div>
            {/* Sort Dropdown */}
            <div className="w-full lg:w-[200px]">
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortOption)}
              >
                <SelectTrigger className="h-10 min-h-10 w-full bg-background">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent
                  alignItemWithTrigger={false}
                  className={"rounded-md p-1 "}
                >
                  <SelectItem className={"focus:text-black"} value="rating">
                    Top Rated
                  </SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="alphabetical">A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Active Filters & Results Count */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">
            Showing {filteredLibraries.length} of {libraries.length} libraries
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="gap-2"
            >
              <XIcon size={16} />
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Filtered Results */}
      {filteredLibraries.length === 0 ? (
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <div className="text-6xl opacity-20">🔍</div>
            <h2 className="text-2xl font-bridge text-muted-foreground">
              No results found
            </h2>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLibraries.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              {/* Top Section: Image + Title (Horizontal) */}
              <CardHeader>
                <div className="flex items-center gap-4">
                  <ProjectLogo
                    src={item.logo_url}
                    alt={item.title}
                    size="md"
                    fallbackText={item.title}
                  />
                  <CardTitle className="text-xl font-bold font-geist-pixel-square flex-1">
                    {item.title}
                  </CardTitle>
                </div>
              </CardHeader>

              {/* Middle Section: Rating, Description, and Tags */}
              <CardContent className="space-y-4">
                {/* Rating */}
                <RatingWidget
                  toolId={item.id}
                  initialRating={item.average_rating}
                  initialTotalRatings={item.total_ratings}
                  size={16}
                />

                {/* Description */}
                <CardDescription className="text-sm line-clamp-3">
                  {item.description}
                </CardDescription>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>

              {/* Bottom Section: Action Buttons */}
              <CardFooter>
                <div className="flex gap-2 w-full">
                  {item.live_url && (
                    <Link
                      href={item.live_url}
                      target="_blank"
                      className="flex-1"
                    >
                      <Button
                        size="default"
                        variant="default"
                        className="w-full"
                      >
                        <GlobeIcon className="mr-2" size={16} />
                        Visit
                      </Button>
                    </Link>
                  )}
                  {item.github_url && (
                    <Link
                      href={item.github_url}
                      target="_blank"
                      className="flex-1"
                    >
                      <Button
                        size="default"
                        variant="outline"
                        className="w-full"
                      >
                        <GithubLogoIcon className="mr-2" size={16} />
                        GitHub
                      </Button>
                    </Link>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
