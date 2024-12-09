import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_KEY = `${import.meta.env.VITE_TMDB_API_KEY}`;
const BASE_URL = "https://api.themoviedb.org/3";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date?: string;
  backdrop_path?: string;
}

export const useMovies = (genreId: number) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMoviesByGenre = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          sort_by: "popularity.desc",
          with_genres: genreId,
          page: 1,
        },
      });
      setMovies(response.data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  }, [genreId]);

  useEffect(() => {
    fetchMoviesByGenre();
  }, [fetchMoviesByGenre]);

  return { movies, loading, error };
};
