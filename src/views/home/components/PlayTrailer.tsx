import { LoadingIndicator } from "@/components/LoadingIndicator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useFetchMovieTrailer } from "@/hooks/useFetchTrailer";
import { MovieType, TVShow } from "types";

export const PlayTrailer = ({
  title,
}: {
  title: MovieType["title"] | TVShow["name"];
}) => {
  const { iframeUrl, loading, error } = useFetchMovieTrailer(title || "");

  const fallbackVideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Replace with your default video URL

  return (
    <section>
      <AspectRatio ratio={19 / 6}>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <iframe
            width="100%"
            height="100%"
            src={error ? fallbackVideoUrl : iframeUrl}
            title={error ? "Default Video" : `Trailer for ${title}`}
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
