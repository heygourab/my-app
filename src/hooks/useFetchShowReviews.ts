import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useFetchShowReviews = (showId: number | undefined) => {
  const [reviews, setReviews] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = `${import.meta.env.VITE_TMDB_API_KEY}`;
  const BASE_URL = "https://api.themoviedb.org/3/tv";

  const fetchNewlyReleasedShows = useCallback(async () => {
    if (!API_KEY) {
      console.error("API key not found");
      setError("API key not found");
      return;
    }

    if (!showId) {
      console.error("Show ID not found");
      setError("Show ID not found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/${showId}/reviews`, {
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
        setReviews(response.data.results.slice(0, 5));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  }, [API_KEY, showId]);

  useEffect(() => {
    fetchNewlyReleasedShows();
  }, [fetchNewlyReleasedShows]);
  return { reviews, loading, error };
};
