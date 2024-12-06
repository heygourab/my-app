import { motion } from "framer-motion";
import { useRef } from "react";
import { MovieType, TVShow } from "types";
import { X } from "lucide-react";
import { MotionButton } from "./MotionBotton"; // Fixed import path
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { genres } from "@/data/movieGenereData.json";

import { PlayTrailer } from "./PlayTrailer";
import { CastList } from "./CastList";
import { useFetchMovieCredits } from "@/hooks/useFetchMovieCredits";
import { StarIcon } from "@heroicons/react/16/solid";
import { ArrowDownIcon } from "@heroicons/react/16/solid";

import { MovieReviews } from "./MovieReviews";
import { useFetchMovieReviews } from "@/hooks/useFectchMovieReviews";

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
      className="fixed inset-0 bg-black/75 backdrop-blur-lg flex items-center justify-center z-50 p-8"
      role="dialog"
      aria-modal="true"
    >
      <MotionButton className="absolute top-4 right-4" onClick={onClose}>
        <X />
      </MotionButton>

      <span className="text-white absolute bottom-28 -right-2 rotate-90">
        Scroll Down
      </span>

      <MotionButton
        onClick={handleScrollDown}
        className="absolute bottom-4 right-4 "
      >
        <ArrowDownIcon className="size-6 text-black  hover:text-white" />
      </MotionButton>

      <div
        ref={scrollableRef}
        className="flex flex-col p-8 w-full h-full scrollbar-hide overflow-y-auto"
      >
        <PlayTrailer title={title} />

        <div
          className={`w-full flex divide-x-2 divide-neutral-400 divide-dotted mt-8`}
        >
          {/* movie poster */}
          <div className={`flex gap-4`}>
            {posterPath && (
              <img
                src={posterPath}
                alt={`${title} Poster`}
                className="w-56 h-80 rounded-3xl object-cover"
                loading="lazy"
              />
            )}
            {/* movie metadata*/}
            <div
              className={`flex flex-col ${
                !reviews.length ? "w-2/3" : "w-full"
              } pr-4`}
            >
              <h2 className="text-5xl text-neutral-200 font-bold">{title}</h2>
              <div className="flex font-bold items-center gap-2 divide-x-2 divide-neutral-200 text-base mt-2">
                {voteAverage && (
                  <div className="flex items-center gap-2 pr-4">
                    <StarIcon className="size-5 text-yellow-400" />
                    <p className="text-neutral-400">{voteAverage} / 10</p>
                  </div>
                )}
                {releaseDate && (
                  <p className="pl-4 text-neutral-400">{releaseDate}</p>
                )}
              </div>
              {movie?.overview && (
                <TextGenerateEffect
                  className="font-normal mt-2"
                  words={movie.overview}
                  textClassName="text-sm text-neutral-300"
                />
              )}
              <div className="flex mt-6 gap-2 w-full flex-wrap">
                {movie?.genre_ids?.map((id) => {
                  const genre = genres.find((g) => g.id === id);
                  return (
                    genre && (
                      <span
                        key={id}
                        className="inline-block px-3 py-2 bg-white/10 text-white rounded-full text-xs"
                      >
                        {genre.name}
                      </span>
                    )
                  );
                })}
              </div>
            </div>
          </div>
          {movie?.id && reviews.length && (
            <MovieReviews reviews={reviews} loading={loading} error={error} />
          )}
        </div>

        {/* Cast Section */}
        <div className="w-full mt-8">
          <h2 className="text-4xl text-neutral-200 font-bold">Movie Casts —</h2>
          {loading && <p className="text-neutral-400">Loading casts...</p>}
          {error && <p className="text-red-500">Failed to load casts.</p>}
          {!loading && !error && <CastList casts={casts ?? []} />}
        </div>
      </div>
    </motion.div>
  );
};
