import { Movie } from "types";

import { useFetchRecommendedMovies } from "@/hooks/useFetchMovieRecommendatio";
import MovieList from "./MovieList";

export const RecommendedMovies = ({
  movieId,
  movieLanguage,
  className,
}: {
  movieId: Movie["id"];
  movieLanguage: Movie["original_language"];
  className: string;
}) => {
  const { recommendedMovies, loading, error } = useFetchRecommendedMovies({
    movieId: movieId,
    movieLanguage: movieLanguage,
  });

  if (loading) {
    return <p>Loading recommendation...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    recommendedMovies.length > 0 && (
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
    )
  );
};
