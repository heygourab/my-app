import { useFetchSimilarMovies } from "@/hooks/useFetchSimilarMovies";
import { MovieType } from "types";
import MovieList from "../MovieList";

export const SimilarMovies = ({
  movieId,
  className,
}: {
  movieId: MovieType["id"];
  className: string;
}) => {
  const { similarMovies, loading, error } = useFetchSimilarMovies(movieId);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={className}>
      <h3 className="text-2xl text-neutral-200 font-bold">Similar Movies —</h3>
      <MovieList
        name={""}
        movies={similarMovies}
        isSubtitleShow={false}
        onCardClick={function (movie: MovieType): void {
          throw new Error("Function not implemented.");
        }}
      />
    </section>
  );
};
