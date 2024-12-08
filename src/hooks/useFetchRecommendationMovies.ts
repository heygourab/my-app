import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { MovieType } from "types";

export const useFetchRecommendedMovies = ({
  movieId,
  movieLanguage,
}: {
  movieId: number | undefined;
  movieLanguage: string | undefined;
}) => {
  const [recommendedMovies, setRecommendedMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3/movie";

  const fetchRecommendedMovies = useCallback(async () => {
    if (!API_KEY) {
      const errorMessage = "API key not found";
      console.error(errorMessage);
      setError(errorMessage);
      return;
    }
    if (!movieId) {
      const errorMessage = "Movie ID not found";
      console.error(errorMessage);
      setError(errorMessage);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/${movieId}/recommendations`,
        {
          params: { api_key: API_KEY, page: 1 },
        }
      );

      const filteredData = data.results?.filter(
        (data: MovieType) => data.original_language === movieLanguage
      );

      setRecommendedMovies(filteredData || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch recommended movies"
      );
    } finally {
      setLoading(false);
    }
  }, [API_KEY, movieId]);

  useEffect(() => {
    fetchRecommendedMovies();
  }, [fetchRecommendedMovies]);

  return { recommendedMovies, loading, error };
};
