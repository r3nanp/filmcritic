import { useQueries } from "@tanstack/react-query";
import { Alert } from "react-native";

import { BASE_URL, TMDB_API_TOKEN } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import type { TmdbMovieResponse } from "@/lib/types";

export const useHome = () => {
  const searchParams = new URLSearchParams({
    language: "pt-BR",
    include_adult: "true",
  });

  const endpoints = [
    {
      queryKey: ["movies", "top-rated"],
      queryFn: () =>
        fetcher<TmdbMovieResponse>(
          `${BASE_URL}/movie/top_rated?${searchParams.toString()}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
              Accept: "application/json",
            },
          }
        ),
    },
    {
      queryKey: ["movies", "popular"],
      queryFn: () =>
        fetcher<TmdbMovieResponse>(
          `${BASE_URL}/movie/popular?${searchParams.toString()}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
              Accept: "application/json",
            },
          }
        ),
    },
    {
      queryKey: ["movies", "upcoming"],
      queryFn: () =>
        fetcher<TmdbMovieResponse>(
          `${BASE_URL}/movie/upcoming?${searchParams.toString()}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
              Accept: "application/json",
            },
          }
        ),
    },
    {
      queryKey: ["movies", "trending"],
      queryFn: () =>
        fetcher<TmdbMovieResponse>(
          `${BASE_URL}/trending/movie/week?${searchParams.toString()}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
              Accept: "application/json",
            },
          }
        ),
    },
  ];

  const results = useQueries({ queries: endpoints });

  console.dir(results, { depth: null });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  if (isError) {
    Alert.alert("Erro", "Falha ao carregar os filmes");
  }

  return {
    movies: results[0].data?.results ?? [],
    popular: results[1].data?.results ?? [],
    upcoming: results[2].data?.results ?? [],
    trending: results[3].data?.results ?? [],
    isLoading,
    error: isError ? "Falha ao carregar os filmes" : null,
    fetchHome: () => results.forEach((result) => result.refetch()),
  };
};
