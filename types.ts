export type MovieType = {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
};

export type TVShow = {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
};

export type Genres = {
  id: number;
  name: string;
};

export type Language = {
  iso_639_1: string;
  english_name: string;
  name: string;
};

export type Country = {
  iso_3166_1: string;
  english_name: string;
  name: string;
};
