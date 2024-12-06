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

export type Cast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: number;
  credit_id: string;
  order: number;
};

export type Review = {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};
