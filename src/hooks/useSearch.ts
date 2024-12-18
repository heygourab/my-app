import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";


interface SearchResult {
  title: string;
}

export const useSearch = (query: string) => {
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create a memoized debounced fetch function
  const debouncedFetchData = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch("http://localhost:3001/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: searchQuery }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch search results: ${response.status}`);
        }

        const data: SearchResult = await response.json();
        setResult(data);
      } catch (error) {
        console.error("Unexpected error:", error);
        setError(error instanceof Error ? error.message : String(error));
        setResult(null);
      } finally {
        setLoading(false);
      }
    }, 1000),
    [] // You can add dependencies here if needed
  );

  useEffect(() => {
    if (query) {
      debouncedFetchData(query);
    } else {
      // Reset results when query is empty
      setResult(null);
    }

    // Cleanup debounce on unmount
    return () => {
      debouncedFetchData.cancel();
    };
  }, [query, debouncedFetchData]);

  return { result, loading, error };
};
