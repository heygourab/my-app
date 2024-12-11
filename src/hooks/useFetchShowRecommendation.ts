import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Show } from "types";

export const useFetchShowRecommendation = ({
  showId,
  showLanguage,
}: {
  showId: number | undefined;
  showLanguage: string | undefined;
}) => {
  const [recommendedShows, setRecommendedShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3/tv";

  const fetchRecommendedShows = useCallback(async () => {
    if (!API_KEY) {
      const errorMessage = "API key not found";
      console.error(errorMessage);
      setError(errorMessage);
      return;
    }
    if (!showId) {
      const errorMessage = "Show ID not found";
      console.error(errorMessage);
      setError(errorMessage);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/${showId}/recommendations`,
        {
          params: { api_key: API_KEY, page: 1 },
        }
      );

      const filteredData = data.results?.filter(
        (data: Show) => data.original_language === showLanguage
      );

      setRecommendedShows(filteredData || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch recommended shows"
      );
    } finally {
      setLoading(false);
    }
  }, [API_KEY, showId, showLanguage]);

  useEffect(() => {
    fetchRecommendedShows();
  }, [fetchRecommendedShows]);

  return { recommendedShows, loading, error };
};
