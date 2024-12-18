// fetch movie by title from the the movie db api
import { useEffect, useState } from "react";
import { Movie } from "types";

export const useFetchMovieByTitle = (title: string) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieByTitle = async () => {
      if (!API_KEY) {
        throw new Error("TMDB API key not set");
      }
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch movie by title: ${response.status}`);
        }

        const { results } = await response.json();
        if (!results.length) {
          throw new Error("Movie not found");
        }

        setMovie(results[0]);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovieByTitle();
  }, [API_KEY, title]);

  return {
    movie,
    loading,
    error,
  };
};
