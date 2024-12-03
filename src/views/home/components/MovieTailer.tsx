import { LoadingIndicator } from "@/components/LoadingIndicator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useFetchMovieTrailer } from "@/hooks/useFetchMovieTrailer";

export const MovieTailer = ({ movieTitle }: { movieTitle: string }) => {
  const { iframeUrl, loading, error } = useFetchMovieTrailer(movieTitle);
  return (
    <section>
      <AspectRatio ratio={19 / 6}>
        {loading ? (
          <LoadingIndicator />
        ) : error ? (
          <div className="error-message">
            Failed to load trailer. Please try again later.
          </div>
        ) : (
          <iframe
            width="100%"
            height="100%"
            src={iframeUrl}
            title="2020 LG Display l  The Black 4K HDR 60fps"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="rounded-3xl"
          ></iframe>
        )}
      </AspectRatio>
    </section>
  );
};
