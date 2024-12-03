import { useState, useEffect } from "react";
import axios from "axios";
import { Language, MovieType } from "types";

export const useFilteredMoviesByLanguage = (
  language: Language["iso_639_1"]
) => {
  const [filteredMovies, setFilteredMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!language) {
      setFilteredMovies([]);
      setError("Invalid language parameter");
      return;
    }

    const fetchMovies = async () => {
      const API_KEY = "532f22a5b395e0cc6588f24e273cb8b0"; // Note: Store this securely in environment variables!
      const BASE_URL = "https://api.themoviedb.org/3";

      try {
        setLoading(true);
        setError(null); // Reset error before fetching
        const response = await axios.get(
          `${BASE_URL}/discover/movie?include_adult=false&include_video=true&page=1&sort_by=popularity.desc&with_original_language=${language}&api_key=${API_KEY}`
        );

        const movies = response.data.results || [];

        console.log("movies", movies);
        const filtered = movies.filter(
          (movie: MovieType) => movie.original_language === language
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
