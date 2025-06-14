import { BASE_URL, TMDB_API_TOKEN } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import type {
  TmdbMovie,
  TmdbMovieResponse,
  TmdbVideoResponse,
} from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

/**
 * This hook is used to fetch movie details and related movies.
 */
export const useMovie = (movieId: string) => {
  const movieDetailsQuery = useQuery({
    queryKey: ["movie", movieId],
    queryFn: async () => {
      const movieDetailsUrl = new URL(`${BASE_URL}/movie/${movieId}`);
      movieDetailsUrl.searchParams.set("language", "pt-BR");

      const videoUrl = new URL(`${BASE_URL}/movie/${movieId}/videos`);
      videoUrl.searchParams.set("language", "pt-BR");

      const [movieDetails, video] = await Promise.all([
        fetcher<TmdbMovie>(movieDetailsUrl.toString(), {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }),
        fetcher<TmdbVideoResponse>(videoUrl.toString(), {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }),
      ]);

      const trailer = video.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      const trailerUrl = trailer
        ? `https://www.youtube.com/watch?v=${trailer.key}`
        : null;

      return {
        ...movieDetails,
        trailerUrl,
      };
    },
    enabled: Boolean(movieId),
  });

  const [firstGenreId] =
    movieDetailsQuery.data?.genres.map((genre) => genre.id) || [];

  const relatedMoviesQuery = useQuery({
    queryKey: ["related-movies", firstGenreId],
    queryFn: async () => {
      const relatedMoviesUrl = new URL(`${BASE_URL}/discover/movie`);
      relatedMoviesUrl.searchParams.set("language", "pt-BR");
      relatedMoviesUrl.searchParams.set("with_genres", String(firstGenreId));
      relatedMoviesUrl.searchParams.set("sort_by", "popularity.desc");

      return fetcher<TmdbMovieResponse>(relatedMoviesUrl.toString(), {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
      });
    },
    enabled: Boolean(firstGenreId),
  });

  const movieDetails = movieDetailsQuery.data;
  const movieDetailsError = movieDetailsQuery.error;

  const relatedMovies = relatedMoviesQuery.data;
  const relatedMoviesError = relatedMoviesQuery.error;

  const isLoading = movieDetailsQuery.isLoading || relatedMoviesQuery.isLoading;
  const isError = movieDetailsError || relatedMoviesError;

  return {
    movieDetails,
    relatedMovies,
    isLoading,
    isError,
  };
};

export type UseMovieDetails = Awaited<ReturnType<typeof useMovie>>;
