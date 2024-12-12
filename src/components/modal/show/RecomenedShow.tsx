import { LoadingIndicator } from "@/components/LoadingIndicator";
import { useFetchShowRecommendation } from "@/hooks/useFetchShowRecommendation";
import { Movie, ShowDetails } from "types";
import MovieList from "../movie/MovieList";
import { useNavigate } from "react-router-dom";

export const RecommendedShow = ({
  showId,
  showLanguage,
  className,
}: {
  showId: ShowDetails["id"];
  showLanguage: ShowDetails["original_language"];
  className?: string;
}) => {
  const navigate = useNavigate();

  const goToRecommendation = (movie: Movie) => {
    navigate(`/recommendation/show/${movie.id}`, { state: { movie } });
  };
  const { recommendedShows, loading, error } = useFetchShowRecommendation({
    showId: showId,
    showLanguage: showLanguage,
  });

  if (loading) {
    return <LoadingIndicator title="Loading recommendation..." />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    recommendedShows.length > 0 && (
      <section className={className}>
        <h3 className="text-2xl text-neutral-200 font-bold">
          Recommended shows —
        </h3>
        <MovieList
          name={""}
          movies={recommendedShows}
          isSubtitleShow={false}
          onCardClick={(show) => goToRecommendation(show)}
        />
      </section>
    )
  );
};
