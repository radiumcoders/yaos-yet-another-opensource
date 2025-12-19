"use client";

import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface ComponentGridProps {
  names: string[];
  title?: string;
}

export default function ComponentGrid({ names, title }: ComponentGridProps) {
  const [suffixFilter, setSuffixFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");

  // Check if filtering should be enabled
  const shouldShowFilters = title === "React-bits";

  // Extract unique suffixes (CSS, TW)
  const suffixes = useMemo(() => {
    if (!shouldShowFilters) return [];
    const suffixSet = new Set<string>();
    names.forEach((name) => {
      const parts = name.split("-");
      if (parts.length > 0) {
        const lastPart = parts[parts.length - 1];
        suffixSet.add(lastPart);
      }
    });
    return Array.from(suffixSet).sort();
  }, [names, shouldShowFilters]);

  // Extract unique languages (TS, JS)
  const languages = useMemo(() => {
    if (!shouldShowFilters) return [];
    const langSet = new Set<string>();
    names.forEach((name) => {
      if (name.includes("-TS-") || name.endsWith("-TS")) {
        langSet.add("TS");
      } else if (name.includes("-JS-") || name.endsWith("-JS")) {
        langSet.add("JS");
      }
    });
    return Array.from(langSet).sort();
  }, [names, shouldShowFilters]);

  // Filter components
  const filteredNames = useMemo(() => {
    if (!shouldShowFilters) return names;

    return names.filter((name) => {
      // Check suffix filter
      const suffixMatch =
        suffixFilter === "all" || name.endsWith(`-${suffixFilter}`);

      // Check language filter
      let languageMatch = true;
      if (languageFilter === "TS") {
        languageMatch = name.includes("-TS-") || name.endsWith("-TS");
      } else if (languageFilter === "JS") {
        languageMatch = name.includes("-JS-") || name.endsWith("-JS");
      }

      return suffixMatch && languageMatch;
    });
  }, [names, suffixFilter, languageFilter, shouldShowFilters]);

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
                    onClick={() => setSuffixFilter(suffix)}
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
        {filteredNames.map((name , index) => (
          <div
            className="border flex items-center p-2 justify-center text-md text-center leading-snug min-h-fit"
            key={` component-${name}-${index}`}
            onClick={() => toast.info(`adding { ${name} } Component to Bucket (not implemented yet)`)}
          >
            {name.replace(/-/g, " ").toUpperCase()}
          </div>
        ))}
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
