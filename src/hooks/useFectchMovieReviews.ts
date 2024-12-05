import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Review } from "types";

export const useFetchMovieReviews = (movieId: number) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = `${import.meta.env.VITE_TMDB_API_KEY}`;
  const BASE_URL = "https://api.themoviedb.org/3/movie";

  const fetchNewlyReleasedMovies = useCallback(async () => {
    if (!API_KEY) {
      console.error("API key not found");
      setError("API key not found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/${movieId}/reviews`, {
        params: {
          api_key: API_KEY,
          page: 1,
        },
      });
      if (
        response.data &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        setReviews(response.data.results);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  }, [API_KEY, movieId]);

  useEffect(() => {
    fetchNewlyReleasedMovies();
  }, [fetchNewlyReleasedMovies]);
  return { reviews, loading, error };
};
// Removed the incorrect useCallBack function
