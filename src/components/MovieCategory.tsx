import { motion } from "framer-motion";
import { MovieCard } from "./MovieCard";

type Movie = {
  title: string;
  year: number;
  imgSrc: string;
  rating: number;
};

type MovieCategoryProps = {
  name: string;
  movies: Movie[];
};

const MovieCategory = (props: MovieCategoryProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-3xl text-white font-medium ">
        Trending {props.name} Movies.
      </h2>
      <motion.div
        className="overflow-x-auto whitespace-nowrap scrollbar-hide"
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
            className="inline-block mr-4"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <MovieCard
              title={movie.title}
              year={movie.year}
              imgSrc={movie.imgSrc}
              rating={movie.rating}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MovieCategory;
