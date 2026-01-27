import { createLoader, parseAsString } from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const dataSearchParams = {
  search: parseAsString.withDefault(""),
};

export const loadSearchParams = createLoader(dataSearchParams);
