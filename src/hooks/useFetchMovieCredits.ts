import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Cast, MovieType } from "types";

export const useFetchMovieCredits = ({
  movie_id,
}: {
  movie_id: MovieType["id"];
}) => {
  const [casts, setCasts] = useState<Cast[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const fetchMovieCredits = useCallback(async () => {
    if (!API_KEY) {
      console.error("API key not found");
      setError("API key not found");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch movie credits: ${response.status}`);
      }
      const data = await response.json();
      setCasts(data.cast); // Assume data.cast is an array of Cast
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data.error.message || "Failed to fetch trailer."
        );
        console.error("Axios error:", err.response?.data || err.message);
      } else {
        setError("Unexpected error occurred.");
        console.error("Unexpected error:", err);
      }
    } finally {
      setLoading(false);
    }
  }, [movie_id, API_KEY]);

  useEffect(() => {
    fetchMovieCredits();
  }, [fetchMovieCredits]);

  return {
    casts,
    loading,
    error,
  };
};
