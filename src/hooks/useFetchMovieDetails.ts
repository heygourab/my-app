import { useEffect, useState } from "react";
import { Movie, MovieDetails } from "types";

export const useFetchMovieDetails = (id: Movie["id"]) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch movie details: ${response.status}`);
        }

        const data: MovieDetails = await response.json();

        setMovieDetails(data);
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

    fetchMovieDetails();
  }, [API_KEY, id]);

  return {
    movieDetails,
    loading,
    error,
  };
};
