import { useFetchSimilarMovies } from "@/hooks/useFetchSimilarMovies";
import { Movie } from "types";
import MovieList from "./movie/MovieList";

export const SimilarMovies = ({
  movie,
  className,
}: {
  movie: Movie;
  className: string;
}) => {
  const { similarMovies, loading, error } = useFetchSimilarMovies({
    movieId: movie.id,
    movieLanguage: movie.original_language,
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
