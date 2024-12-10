import { useEffect, useState } from "react";

import { Show, ShowDetails } from "types";

export const useFetchShowDetails = (id: Show["id"]) => {
  const [showDetails, setShowDetails] = useState<ShowDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      throw new Error("TMDB API key not set");
    }
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch show details: ${response.status}`);
        }

        const data: ShowDetails = await response.json();

        setShowDetails(data);
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

    fetchShowDetails();
  }, [API_KEY, id]);

  return {
    showDetails,
    loading,
    error,
  };
};
