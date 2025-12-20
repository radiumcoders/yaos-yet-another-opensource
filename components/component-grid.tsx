"use client";

import { useState } from "react";
import { Button } from "./ui/button";

interface ComponentGridProps {
  names: string[];
  title?: string;
}

export default function ComponentGrid({ names, title }: ComponentGridProps) {
  const [suffixFilter, setSuffixFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  const shouldShowFilters = title === "React-bits";

  // Extract unique suffixes
  const suffixes = shouldShowFilters
    ? Array.from(
        new Set(names.map((name) => name.split("-").at(-1)).filter(Boolean))
      ).sort()
    : [];

  // Extract unique languages
  const languages = shouldShowFilters
    ? Array.from(
        new Set(
          names
            .filter(
              (name) =>
                name.includes("-TS-") ||
                name.endsWith("-TS") ||
                name.includes("-JS-") ||
                name.endsWith("-JS")
            )
            .map((name) =>
              name.includes("-TS-") || name.endsWith("-TS") ? "TS" : "JS"
            )
        )
      ).sort()
    : [];

  // Filter components
  const matchesLanguage = (name: string) => {
    if (languageFilter === "all") return true;
    if (languageFilter === "TS")
      return name.includes("-TS-") || name.endsWith("-TS");
    if (languageFilter === "JS")
      return name.includes("-JS-") || name.endsWith("-JS");
    return true;
  };

  const matchesSuffix = (name: string) => {
    return suffixFilter === "all" || name.endsWith(`-${suffixFilter}`);
  };

  const filteredNames = shouldShowFilters
    ? names.filter((name) => matchesSuffix(name) && matchesLanguage(name))
    : names;

  return (
    <div>
      {shouldShowFilters && (
        <>
          {/* Language Filter */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Filter by Language:</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setLanguageFilter("all")}
                variant={languageFilter === "all" ? "default" : "outline"}
                size="sm"
              >
                All
              </Button>
              {languages.map((lang) => {
                const count = names.filter((name) =>
                  lang === "TS"
                    ? name.includes("-TS-") || name.endsWith("-TS")
                    : name.includes("-JS-") || name.endsWith("-JS")
                ).length;
                return (
                  <Button
                    key={lang}
                    onClick={() => setLanguageFilter(lang)}
                    variant={languageFilter === lang ? "default" : "outline"}
                    size="sm"
                  >
                    {lang} ({count})
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Suffix Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Filter by Type:</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setSuffixFilter("all")}
                variant={suffixFilter === "all" ? "default" : "outline"}
                size="sm"
              >
                All ({names.length})
              </Button>
              {suffixes.map((suffix) => {
                const count = names.filter((name) =>
                  name.endsWith(`-${suffix}`)
                ).length;
                return (
                  <Button
                    key={suffix}
                    onClick={() => setSuffixFilter(suffix!)}
                    variant={suffixFilter === suffix ? "default" : "outline"}
                    size="sm"
                  >
                    {suffix} ({count})
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-600 mb-4">
            Showing {filteredNames.length} of {names.length} components
          </p>
        </>
      )}

      {/* Component Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNames.map((name, index) => {
          const isSelected = selectedComponents.includes(name);
          return (
            <div
              className={`border flex items-center lowercase p-2 justify-center text-md text-center leading-snug min-h-fit cursor-pointer transition-colors ${
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              }`}
              key={` component-${name}-${index}`}
              onClick={() => {
                const newSelected = isSelected
                  ? selectedComponents.filter((c) => c !== name)
                  : [...selectedComponents, name];
                setSelectedComponents(newSelected);
              }}
            >
              {name.replace(/-/g, " ").toUpperCase()}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredNames.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          No components found for this filter combination.
        </p>
      )}
    </div>
  );
}
