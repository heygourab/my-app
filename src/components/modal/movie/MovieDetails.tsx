import { Movie } from "types";
import { MovieInfo } from "./MovieInfo";
import { MovieReviews } from "@/components/modal/Reviews";
import { useFetchMovieReviews } from "@/hooks/useFetchMovieReviews";
import { useFetchMovieCredits } from "@/hooks/useFetchMovieCredits";
import { CastList } from "@/components/CastList";
import { PlayTrailer } from "@/components/PlayTrailer";

export const MovieDetails = ({ movie }: { movie: Required<Movie> }) => {
  const {
    reviews,
    loading: reviewsLoading,
    error: reviewsError,
  } = useFetchMovieReviews(movie?.id);

  const {
    casts,
    loading: castsLoading,
    error: castsError,
  } = useFetchMovieCredits({ movie_id: movie?.id });

  return (
    <div className="sm:mt-8 flex flex-col ">
      <PlayTrailer
        className="order-2 mt-8 sm:mt-0 sm:order-1"
        title={movie.title}
      />
      <section className="order-1 sm:order-1 flex w-full flex-col md:flex-col lg:divide-x-2 lg:flex-row">
        <MovieInfo
          title={movie.title}
          posterPath={movie.poster_path}
          releaseDate={movie.release_date}
          voteAverage={movie.vote_average}
          genreIds={movie.genre_ids}
          overview={movie.overview || ""}
        />
        {movie.id && reviews.length > 0 && (
          <MovieReviews
            title="Movie Reviews"
            reviews={reviews}
            loading={reviewsLoading}
            error={reviewsError}
            className="sm:pl-4 mt-8"
          />
        )}
      </section>

      <section className="mt-6 order-3">
        <h3 className="text-2xl text-neutral-200 font-bold">Movie Casts —</h3>
        {castsLoading && <p className="text-neutral-400">Loading casts...</p>}
        {castsError && <p className="text-red-500">Failed to load casts.</p>}
        {!castsLoading && !castsError && <CastList casts={casts ?? []} />}
      </section>
      
    </div>
  );
};
