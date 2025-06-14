import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { BASE_URL, TMDB_API_TOKEN } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import type { TmdbMovieResponse } from "@/lib/types";

/**
 * Hook to search for movies in the TMDB API.
 * @returns The search query, search results, search status, and a function to set the search query.
 */
export const useSearchMovie = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: searchResults = [], status: searchStatus } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery.trim()) return [];

      const url = new URL(`${BASE_URL}/search/movie`);
      url.searchParams.set("query", debouncedQuery);
      url.searchParams.set("language", "pt-BR");

      const response = await fetcher<TmdbMovieResponse>(url.toString(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
          Accept: "application/json",
        },
      });

      return response.results;
    },
    enabled: Boolean(debouncedQuery.trim()),
  });

  return {
    searchQuery: debouncedQuery,
    searchResults,
    searchStatus,
    setSearchQuery,
  };
};
