import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Movie } from "types";

export const useFetchSimilarMovies = ({
  movieId,
  movieLanguage,
}: {
  movieId: Movie["id"];
  movieLanguage: Movie["original_language"];
}) => {
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3/movie";

  const fetchSimilarMovies = useCallback(async () => {
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
      const { data } = await axios.get(`${BASE_URL}/${movieId}/similar`, {
        params: { api_key: API_KEY, page: 1 },
      });

      const filteredData = data.results?.filter(
        (data: Movie) => data.original_language === movieLanguage
      );

      setSimilarMovies(filteredData || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch similar movies"
      );
    } finally {
      setLoading(false);
    }
  }, [API_KEY, movieId, movieLanguage]);

  useEffect(() => {
    fetchSimilarMovies();
  }, [fetchSimilarMovies]);

  return { similarMovies, loading, error };
};
