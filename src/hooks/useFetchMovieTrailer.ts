import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchMovieTrailer = (movieTitle: string) => {
  const [iframeUrl, setIframeUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrailer = async (movieTitle: string) => {
    const apiKey = `${import.meta.env.VITE_YT_API_KEY}`; // Replace with your API key
    const query = `${movieTitle} official trailer`;
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
        setIframeUrl("");
        setError("No trailer found.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching trailer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieTitle.trim()) {
      fetchTrailer(movieTitle);
    }
  }, [movieTitle]);

  return { iframeUrl, loading, error };
};
