type TmdbGenre = {
  id: number;
  name: string;
};

export type TmdbMovie = {
  adult: boolean;
  backdrop_path: string;
  genres: TmdbGenre[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TmdbVideo = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};

export type TmdbVideoResponse = {
  results: TmdbVideo[];
};

export type TmdbMovieResponse = {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
};
