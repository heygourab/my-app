import { motion } from "framer-motion";
import { MovieType } from "types";

export const MovieCard = (props: MovieType) => {
  const imgSrc = `https://image.tmdb.org/t/p/w500/${props.poster_path}`;
  const year = new Date(`${props.release_date}`).getFullYear();
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-40  flex-shrink-0 inline-block mr-6 mt-6 overflow-hidden"
      >
        <img
          src={imgSrc}
          alt="Movie Poster"
          className="w-full rounded-3xl object-cover"
        />
        <div className="mt-4">
          <h3 className="truncate text-sm capitalize text-white">
            {props.title}
          </h3>
          <div className="mt-1 flex items-center gap-x-4 divide-x divide-slate-700 text-slate-400">
            <p className="flex text-xs items-center gap-x-1.5">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {Number(props.vote_average).toFixed(1)}
            </p>
            <p className="pl-4 text-xs">{year}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};
