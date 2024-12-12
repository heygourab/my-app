import { DetailsModal } from "@/components/modal/DetailsModal";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useEffect, useRef } from "react";

import { Navigate, useLocation, useParams } from "react-router-dom";

export const RecommendationPage = () => {
  const { type, id } = useParams();
  const location = useLocation();

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Cancel previous requests if any when `id` or `type` changes
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort();
    }

    // Create a new AbortController for the current network requests
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current?.signal;

    // Example of handling a network request
    if (id && type) {
      fetch(`/api/recommendations/${type}/${id}`, { signal })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch recommendations");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetched data:", data);
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            console.log("Request canceled");
          } else {
            console.error("Fetch error:", error);
          }
        });
    }

    return () => {
      // Clean up on component unmount or parameter change
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [type, id]);

  if (!id || !type || !["movie", "show"].includes(type)) {
    return <Navigate to="/" />;
  }

  return (
    <AuroraBackground className="bg-slate-950 h-screen overflow-y-auto antialiased">
      {type === "movie" && id && (
        <DetailsModal
          key={id}
          movieId={Number(id)}
          onClose={() => {
            location.state = undefined;
            window.history.back();
          }}
        />
      )}
      {type === "show" && id && (
        <DetailsModal
          key={id}
          showId={Number(id)}
          onClose={() => {
            location.state = undefined;
            window.history.back();
          }}
          movieId={undefined}
        />
      )}
    </AuroraBackground>
  );
};
