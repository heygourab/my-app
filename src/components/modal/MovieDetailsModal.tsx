import { motion } from "framer-motion";
import { useRef } from "react";
import { MovieType, TVShow } from "types";
import { X } from "lucide-react";
import { MotionButton } from "@/components/MotionBotton"; // Fixed import path

import { PlayTrailer } from "@/components/PlayTrailer";
import { CastList } from "@/components/CastList";
import { useFetchMovieCredits } from "@/hooks/useFetchMovieCredits";

import { ArrowDownIcon } from "@heroicons/react/16/solid";

import { MovieReviews } from "@/components/MovieReviews";
import { useFetchMovieReviews } from "@/hooks/useFectchMovieReviews";
import { MovieInfo } from "./MovieInfo";

export const DetailsModal = ({
  movie,
  tvShow,
  onClose,
}: {
  movie?: MovieType;
  tvShow?: TVShow;
  onClose: () => void;
}) => {
  const { reviews, loading, error } = useFetchMovieReviews(
    movie?.id || undefined
  );
  const scrollableRef = useRef<HTMLDivElement | null>(null);

  // Fetch movie credits (casts)
  const { casts } = useFetchMovieCredits({
    movie_id: movie?.id,
  });

  const handleScrollDown = () => {
    scrollableRef.current?.scrollBy({ top: 200, behavior: "smooth" });
  };

  const content = movie || tvShow;
  const title = content?.title || content?.name || "Untitled";

  const posterPath = content?.poster_path
    ? `https://image.tmdb.org/t/p/w500/${content.poster_path}`
    : "";
  const releaseDate = movie?.release_date || tvShow?.first_air_date;
  const voteAverage = content?.vote_average?.toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/75 backdrop-blur-lg flex items-center justify-center z-50 sm:p-8"
      role="dialog"
      aria-modal="true"
    >
      <MotionButton className="absolute top-4 z-50 right-4" onClick={onClose}>
        <X />
      </MotionButton>

      <div className="absolute hidden z-50 space-y-12 bottom-4 -right-2 sm:flex flex-col items-center">
        <span className="text-white rotate-90">Scroll Down</span>
        <MotionButton onClick={handleScrollDown}>
          <ArrowDownIcon className="w-6 h-6 text-black hover:text-white" />
        </MotionButton>
      </div>

      <div
        ref={scrollableRef}
        className="flex flex-col p-4 sm:p-8 w-full h-full scrollbar-hide overflow-y-auto"
      >
        <PlayTrailer
          className="order-2 mt-4 sm:mt-0 sm:order-1"
          title={title}
        />

        <section className="order-1 flex flex-col md:flex-col lg:flex-row ">
          <MovieInfo
            title={title}
            posterPath={posterPath}
            releaseDate={releaseDate}
            voteAverage={voteAverage}
            genreIds={movie?.genre_ids}
            overview={movie ? movie.overview : ""}
          />
          {movie?.id && reviews.length && (
            <MovieReviews reviews={reviews} loading={loading} error={error} />
          )}
        </section>

        {/* Cast Section */}
        <div className="mt-6 order-3">
          <h3 className="text-2xl text-neutral-200 font-bold">Movie Casts —</h3>
          {loading && <p className="text-neutral-400">Loading casts...</p>}
          {error && <p className="text-red-500">Failed to load casts.</p>}
          {!loading && !error && <CastList casts={casts ?? []} />}
        </div>
      </div>
    </motion.div>
  );
};
