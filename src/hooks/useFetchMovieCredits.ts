import axios from "axios";
import { useState, useEffect } from "react";
import { Cast, MovieType } from "types";

export const useFetchMovieCredits = ({
  movie_id,
}: {
  movie_id: MovieType["id"];
}) => {
  const [casts, setCasts] = useState<Cast[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      console.error("API key not found");
      setError("API key not found");
      return;
    }

    const fetchMovieCredits = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${apiKey}`
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
    };

    fetchMovieCredits();
  }, [movie_id, apiKey]);

  return {
    casts,
    loading,
    error,
  };
};
