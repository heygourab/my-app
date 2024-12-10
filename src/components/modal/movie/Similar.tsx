import { useFetchSimilarMovies } from "@/hooks/useFetchSimilarMovies";
import { Movie } from "types";
import MovieList from "./MovieList";

export const SimilarMovies = ({
  movieId,
  movieLanguage,
  className,
}: {
  movieId: Movie["id"];
  movieLanguage: Movie["original_language"];
  className: string;
}) => {
  const { similarMovies, loading, error } = useFetchSimilarMovies({
    movieId: movieId,
    movieLanguage: movieLanguage,
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    similarMovies.length > 0 && (
      <section className={className}>
        <h3 className="text-2xl text-neutral-200 font-bold">
          Similar Movies —
        </h3>
        <MovieList
          name={""}
          movies={similarMovies}
          isSubtitleShow={false}
          onCardClick={() => {}}
        />
      </section>
    )
  );
};
