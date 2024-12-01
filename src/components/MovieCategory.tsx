import { motion } from "framer-motion";
import { MovieCard } from "./MovieCard";

export type MovieType = {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
};

type MovieCategoryProps = {
  name: string;
  movies: MovieType[];
};

const MovieCategory = (props: MovieCategoryProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-3xl text-white font-medium ">
        Trending {props.name} Movies.
      </h2>
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
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MovieCategory;
