import { MovieType } from "types";
import MovieList from "../MovieList";
import { useFetchRecommendedMovies } from "@/hooks/useFetchRecommendationMovies";

export const RecommendedMovies = ({
  movieId,
  className,
}: {
  movieId: MovieType["id"];
  className: string;
}) => {
  const { recommendedMovies, loading, error } =
    useFetchRecommendedMovies(movieId ?? undefined);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={className}>
      <h3 className="text-2xl text-neutral-200 font-bold">
        Recommended Movies —
      </h3>
      <MovieList
        name={""}
        movies={recommendedMovies}
        isSubtitleShow={false}
        onCardClick={() => {}}
      />
    </section>
  );
};
