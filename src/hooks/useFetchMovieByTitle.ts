import { useEffect, useState } from "react";
import { Movie } from "types";

const useFetchMovieByTitle = (title: string) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = `${import.meta.env.VITE_TMDB_API_KEY}`;
  const BASE_URL = "https://api.themoviedb.org/3/tv";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`
        );
        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setMovie(null);
        }
      } catch (error) {
        console.error("Failed to fetch movie: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [title]);

  return { movie, loading };
};
