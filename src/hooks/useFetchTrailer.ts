import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchMovieTrailer = (movieTitle: string) => {
  const [iframeUrl, setIframeUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrailer = async (title: string) => {
    if (!title.trim()) {
      setError("Movie title is empty.");
      return;
    }

    const apiKey = import.meta.env.VITE_YT_API_KEY; // Ensure this is correctly set in .env
    const query = `${title} official trailer`;
    const url = `https://www.googleapis.com/youtube/v3/search`;

    setLoading(true);
    setError(null);
    setIframeUrl("");

    try {
      const response = await axios.get(url, {
        params: {
          part: "snippet",
          maxResults: 1,
          q: query,
          key: apiKey,
          type: "video",
          videoEmbeddable: "true",
        },
      });

      const items = response.data.items;
      if (items && items.length > 0) {
        const videoId = items[0].id.videoId;
        const iframeUrl = `https://www.youtube.com/embed/${videoId}`;
        setIframeUrl(iframeUrl);
      } else {
        setError("No trailer found.");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data.error.message || "Failed to fetch trailer."
        );
        console.error("Axios error:", err.response?.data || err.message);
      } else {
        setError("Unexpected error occurred.");
        console.error("Unexpected error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrailer(movieTitle);
  }, [movieTitle]);

  return { iframeUrl, loading, error };
};
