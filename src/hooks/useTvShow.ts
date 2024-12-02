import { useState, useEffect } from "react";
import axios from "axios";
import { TVShow } from "types";

export const useTrendingTVShows = (page = 1) => {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTrendingTVShows = async () => {
      const API_KEY = "532f22a5b395e0cc6588f24e273cb8b0";
      const BASE_URL = "https://api.themoviedb.org/3";

      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/trending/tv/week`, {
          params: {
            api_key: API_KEY,
            page: page,
          },
        });

        setShows(response.data.results.slice(0, 12));
        setTotalPages(response.data.total_pages);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch trending TV shows ${err}`);
        setLoading(false);
      }
    };

    fetchTrendingTVShows();
  }, [page]);

  return { shows, loading, error, totalPages };
};
