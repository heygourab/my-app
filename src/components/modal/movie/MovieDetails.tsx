import { Movie } from "types";
import { PlayTrailer } from "@/components/PlayTrailer";
import { useFetchMovieDetails } from "@/hooks/useFetchMovieDetails";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { MovieInfo } from "./MovieInfo";
import { MovieReviews } from "../Reviews";

export const MovieDetails = ({ movie }: { movie: Required<Movie> }) => {
  const { movieDetails, loading, error } = useFetchMovieDetails(movie.id);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    movieDetails && (
      <div className="sm:mt-8 flex flex-col ">
        <PlayTrailer
          className="order-2 mt-8 sm:mt-0 sm:order-1"
          title={movieDetails.title ?? undefined}
        />
        <section className="order-1 sm:order-1 flex w-full flex-col md:flex-col lg:divide-x-2 lg:flex-row">
          <MovieInfo
            title={movieDetails.title}
            posterPath={movieDetails.poster_path ?? undefined}
            releaseDate={movieDetails.release_date}
            voteAverage={movieDetails.vote_average}
            overview={movieDetails.overview ?? ""}
            genres={movieDetails.genres}
            tagline={movieDetails.tagline ?? undefined}
          />
          {movie.id && (
            <MovieReviews movieId={movie.id} className="sm:pl-4 mt-8" />
          )}
        </section>
        
      </div>
    )
  );
};
