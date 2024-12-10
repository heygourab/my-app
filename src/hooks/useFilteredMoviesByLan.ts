import { useState, useEffect } from "react";
import axios from "axios";
import { Movie, SpokenLanguage } from "types";

export const useFilteredMoviesByLanguage = (
  language: SpokenLanguage["iso_639_1"]
) => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!language) {
      setFilteredMovies([]);
      setError("Invalid language parameter");
      return;
    }

    const fetchMovies = async () => {
      const API_KEY = `${import.meta.env.VITE_TMDB_API_KEY}`;
      const BASE_URL = "https://api.themoviedb.org/3";

      try {
        setLoading(true);
        setError(null); // Reset error before fetching
        const response = await axios.get(
          `${BASE_URL}/discover/movie?include_adult=true&include_video=true&page=1&sort_by=popularity.desc&with_original_language=${language}&api_key=${API_KEY}`
        );

        const movies = response.data.results || [];
        const filtered = movies.filter(
          (movie: Movie) => movie.original_language === language
        );

        setFilteredMovies(filtered);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [language]);

  return { filteredMovies, loading, error };
};
