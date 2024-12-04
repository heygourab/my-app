import { motion } from "framer-motion";
import { MovieCard } from "./MovieCard";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { MovieType } from "types";

type MovieCategoryProps = {
  name: string;
  movies: MovieType[];
  onCardClick: (movie: MovieType) => void;
  isSubtitleShow?: boolean;
};

const MovieList = (props: MovieCategoryProps) => {
  const { isSubtitleShow = true } = props;
  return (
    <div className="mt-8">
      {isSubtitleShow ? (
        <h2 className="flex items-end gap-4 font-normal text-white ">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 flex-shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
              />
            </svg>
          </span>

          <TextGenerateEffect
            words={`Trending ${props.name} Movies`}
            className="font-normal"
            fontSize="lg"
          />
        </h2>
      ) : null}
      <motion.div
        className="overflow-x-auto whitespace-nowrap scrollbar-hide mb-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {props.movies.map((movie, index) => (
          <motion.div
            key={index}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <MovieCard
              title={movie.title}
              release_date={movie.release_date}
              poster_path={movie.poster_path ?? ""}
              vote_average={movie.vote_average ?? 0}
              id={0}
              name={""}
              first_air_date={""}
              onClick={() => props.onCardClick(movie)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MovieList;
