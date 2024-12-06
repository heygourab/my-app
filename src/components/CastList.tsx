import { motion } from "framer-motion";
import React from "react";
import { Cast } from "types";
interface MovieListProps {
  casts: Cast[];
}

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
    <div className="w-48 mr-6">
      <img
        src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
        alt={`${cast.name} poster`}
        className="w-full h-64 rounded-3xl object-cover"
        loading="lazy"
      />
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

export const CastList = ({ casts }: MovieListProps) => (
  <div className="mt-4">
    <motion.div
      className="overflow-x-auto whitespace-nowrap scrollbar-hide mb-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {casts.map((cast) => (
        <CastItem key={cast.id} cast={cast} />
      ))}
    </motion.div>
  </div>
);
