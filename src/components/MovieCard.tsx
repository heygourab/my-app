import { motion } from "framer-motion";
import { memo } from "react";
import { MovieType, TVShow } from "types";

export const MovieCard = memo(
  ({
    poster_path,
    title,
    vote_average,
    release_date,
    first_air_date,
    name,
    className = "",
    onClick,
  }: MovieType & { className?: string; onClick?: () => void } & TVShow) => {
    const imgSrc = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    const year = new Date(
      (release_date as string) ?? first_air_date
    ).getFullYear();

    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-48 flex-shrink-0 inline-block mr-6 mt-6 overflow-hidden ${className}`}
        onClick={onClick}
        role="button"
        aria-label={`View details of ${name || title}`}
      >
        <img
          src={imgSrc}
          alt={`${title} poster`}
          className="w-full h-64 rounded-3xl object-cover"
          loading="lazy"
        />
        <div className="mt-4">
          <h3 className="truncate text-base font-medium tracking-wide capitalize text-white">
            {name || title}
          </h3>
          <div className="mt-1 flex items-center gap-x-4 divide-x divide-slate-700 text-slate-400">
            <p className="flex text-xs items-center gap-x-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-yellow-400"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>

              {Number(vote_average).toFixed(1)}
            </p>
            <p className="pl-4 text-xs">{year}</p>
          </div>
        </div>
      </motion.div>
    );
  }
);

MovieCard.displayName = "MovieCard";
