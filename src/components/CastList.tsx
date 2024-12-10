import { useFetchMovieCredits } from "@/hooks/useFetchMovieCredits";
import { motion } from "framer-motion";
import React from "react";
import { Cast, Movie } from "types";
import { LoadingIndicator } from "./LoadingIndicator";
import { Poster } from "./Poster";

const castItemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const CastItem = React.memo(({ cast }: { cast: Cast }) => (
  <motion.div
    key={cast.id} // Prefer a unique identifier if available
    className="inline-block"
    variants={castItemVariants}
    transition={{ duration: 0.5 }}
  >
    <div className="w-48 h-64 mr-6">
      <Poster title={cast.name} posterPath={cast.profile_path} />
      <div>
        <h3 className="truncate text-base mt-2 font-medium tracking-wide capitalize text-white">
          {cast.name}
        </h3>
        <div className="text-slate-400">
          <p className="text-xs">{cast.character}</p>
        </div>
      </div>
    </div>
  </motion.div>
));

export const CastList = ({ movieId }: { movieId: Required<Movie>["id"] }) => {
  const { casts, loading, error } = useFetchMovieCredits({
    movie_id: movieId,
  }) as { casts: Cast[]; loading: boolean; error: string | null };

  if (loading) {
    return <LoadingIndicator title="Loading movie casts..." />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  return (
    casts && (
      <div className="mt-4">
        <motion.div
          className="overflow-x-auto whitespace-nowrap scrollbar-hide mb-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {casts?.map((cast) => (
            <CastItem key={cast.id} cast={cast} />
          ))}
        </motion.div>
      </div>
    )
  );
};
