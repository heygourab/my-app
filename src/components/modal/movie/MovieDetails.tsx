import { Movie } from "types";
import { PlayTrailer } from "@/components/PlayTrailer";
import { useFetchMovieDetails } from "@/hooks/useFetchMovieDetails";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { MovieInfo } from "./MovieInfo";
import { MovieReviews } from "./MovieReviews";
import { RecommendedMovies } from "./Recommened";
import { SimilarMovies } from "./Similar";
import { CastList } from "@/components/CastList";

import { useNavigate } from "react-router-dom";

export const MovieDetails = ({ movie }: { movie: Required<Movie> }) => {
  const { movieDetails, loading, error } = useFetchMovieDetails(movie.id);

  const navigate = useNavigate();

  if (loading) {
    return <LoadingIndicator title="Loading movie details..." />;
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
            budget={movieDetails.budget}
            revenue={movieDetails.revenue}
          />
          {movieDetails.id && (
            <MovieReviews
              id={movie.id}
              className="sm:pl-4 mt-8"
              title={"Movie Reviews"}
            />
          )}
        </section>

        <section className="order-3 mt-8">
          <h3 className={`text-2xl text-neutral-200 font-semibold`}>
            Movie casts —
          </h3>
          <CastList movieId={movieDetails.id} />
        </section>

        <RecommendedMovies
          movieId={movieDetails.id}
          movieLanguage={movieDetails.original_language}
          className={"order-4 mt-8"}
          onCardClick={() => {
            navigate(`/recommendation/${movieDetails.title}`);
          }}
        />

        <SimilarMovies
          movieId={movieDetails.id}
          movieLanguage={movieDetails.original_language}
          className={"order-5 mt-8"}
        />
      </div>
    )
  );
};
