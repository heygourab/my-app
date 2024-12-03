import { motion } from "framer-motion";
import { MovieType, TVShow } from "types";
import { X } from "lucide-react";
import { MotionButton } from "@/components/motionBotton";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { genres } from "@/data/movieGenereData.json";
import { PlayTrailer } from "./TailerScection";

export const DetailsModal = ({
  movie,
  tvShow,
  onClose,
}: {
  movie?: MovieType;
  tvShow?: TVShow;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed  inset-0 bg-black/75  bg-opacity-40 backdrop-blur-lg flex items-center justify-center z-50 p-8"
    >
      <MotionButton
        className="absolute top-3 right-3"
        onClick={onClose}
        children={<X />}
      />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
        className="flex flex-col justify-between px-8 w-full h-full scrollbar-hide overflow-y-auto"
      >
        {/* video */}
        <PlayTrailer title={movie ? movie.title : tvShow?.name} />

        {/* movie details */}
        <div className="flex  space-x-4">
          <div className="flex gap-4">
            <img
              src={`https://image.tmdb.org/t/p/w500/${
                movie ? movie.poster_path : tvShow?.poster_path
              }`}
              alt=""
              className="w-56 h-80 rounded-3xl object-cover"
            />
            <div className="flex flex-col w-1/2">
              <h3 className="text-4xl text-neutral-200 font-bold tracking-wide">
                {movie?.title ?? tvShow?.name}
              </h3>
              <div className="flex font-bold items-center gap-2 divide-x-2 divide-neutral-200 text-base mt-2">
                {/* Rating Section */}
                <div className="flex items-center gap-2 pr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-yellow-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-neutral-400">
                    {movie
                      ? movie.vote_average?.toFixed(1)
                      : tvShow?.vote_average.toFixed(1)}{" "}
                    / 10
                  </p>
                </div>
                {/* Release Date Section */}
                <p className="pl-4 text-neutral-400">
                  {movie ? movie.release_date : tvShow?.first_air_date}
                </p>
              </div>
              <TextGenerateEffect
                className="font-normal"
                words={movie?.overview ?? ""}
                textClassName="text-sm text-neutral-300"
              />
              <div className="flex mt-6 gap-2 w-full">
                {movie?.genre_ids?.map((id) => (
                  <div
                    key={id}
                    className="inline-block px-3 py-2 bg-white/10 text-white rounded-full text-xs backdrop-blur"
                  >
                    {genres.find((genre) => genre.id === id)?.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
