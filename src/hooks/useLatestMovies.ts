import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import type { Movie } from "types";

export const useLatestMovies = () => {
  const [newMovies, setNewMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = `${import.meta.env.VITE_TMDB_API_KEY}`;
  const BASE_URL = "https://api.themoviedb.org/3/trending";

  const fetchNewlyReleasedMovies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/movie/week`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page: 1,
        },
      });
      if (
        response.data &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        setNewMovies(response.data.results);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  }, [API_KEY, BASE_URL]);

  useEffect(() => {
    fetchNewlyReleasedMovies();
  }, [fetchNewlyReleasedMovies]);

  return { newMovies, loading, error };
};
