import { MovieCard } from "../MovieCard";
import { MotionButton } from "../MotionBotton";
import { X } from "lucide-react";
import { LoadingIndicator } from "../LoadingIndicator";
import { useFetchMovieByTitle } from "@/hooks/useFetchMovieByTitle";
import { RecommendedMovies } from "./movie/RecommenedMovies";
import { useNavigate } from "react-router-dom";
import { Movie } from "types";

export const SearchModal = ({
  title,
  onClick,
}: {
  title?: string;
  onClick?: () => void;
}) => {
  const { movie, loading, error } = useFetchMovieByTitle(title ?? "");
  const navigate = useNavigate();

  const goToRecommendation = (movie: Movie) => {
    navigate(`/recommendation/movie/${movie.id}`, { state: { movie } });
  };

  const renderContent = () => {
    if (error) {
      return <div className="text-red-400 font-bold">{error}</div>;
    }

    if (loading) {
      return <LoadingIndicator title="Searching movie...." />;
    }

    return (
      <div className="w-full">
        <h3 className="text-2xl text-neutral-200 font-bold">Search Result —</h3>
        {movie && (
          <>
            <MovieCard
              poster_path={movie.poster_path ?? ""}
              title={movie.title ?? ""}
              vote_average={movie.vote_average ?? 0}
              release_date={movie.release_date ?? ""}
              onClick={() => goToRecommendation(movie)}
            />
            <RecommendedMovies
              movieId={movie.id}
              movieLanguage={movie.original_language}
              className={"mt-8"}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div className="h-3/4 p-4 top-16 left-32 w-3/4 flex-col overflow-y-auto mx-4 my-4 items-start rounded-3xl overflow-hidden fixed inset-0 bg-black/65 z-50 flex backdrop-blur-2xl border border-neutral-400">
      <MotionButton className="absolute top-4 right-4" onClick={onClick}>
        <X />
      </MotionButton>
      {renderContent()}
    </div>
  );
};
