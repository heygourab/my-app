import { useState, useEffect } from "react";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface UseMoviesResult {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  fetchMoviesByGenre: (genreId: number) => Promise<void>;
}

export const useMovies = (): UseMoviesResult => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMoviesByGenre = async (genreId: number) => {
    setLoading(true);
    setError(null);
    try {
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

      if (!API_KEY || !BASE_URL) {
        throw new Error("Missing API configuration");
      }

      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          sort_by: "popularity.desc",
          with_genres: genreId,
          page: 1,
        },
      });

      setMovies(response.data.results.slice(0, 6));
    } catch (err) {
      console.error(err);
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  return { movies, loading, error, fetchMoviesByGenre };
};
