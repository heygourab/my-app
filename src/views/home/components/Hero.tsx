import { useCallback, useEffect, useState } from "react";
import { MovieType } from "types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

import { genres } from "@/data/movieGenereData.json";
import { motion } from "framer-motion";
export const Hero = ({
  movies,
  onClick,
}: {
  movies: MovieType[];
  onClick: (movie: MovieType) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMovie = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  }, [movies.length]);

  const previousMovie = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextMovie();
    }, 10000);

    return () => clearInterval(timer);
  }, [movies.length, nextMovie]);

  return (
    <main className=" w-full  sm:visible pt-4 relative">
      <AspectRatio ratio={19 / 6} className="overflow-hidden rounded-3xl">
        {movies.map((movie, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={`${movie.title} Poster`}
              className="w-full h-full object-cover"
            />
            <div className="absolute p-4 inset-0 bg-gradient-to-t from-slate-950/90 to-transparent flex flex-col justify-between">
              <HoverBorderGradient
                as="button"
                className="text-white bg-transparent flex gap-2 items-center space-x-2"
              >
                🔥
                <span>Latest</span>
              </HoverBorderGradient>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-neutral-100">
                  {movie.title}
                </h1>
                <div className="w-full md:w-2/3">
                  <TextGenerateEffect
                    words={movie.overview ?? ""}
                    className="font-normal"
                    textClassName="text-base md:text-lg text-neutral-300 text-pretty"
                  />
                </div>
                <div className="flex mt-6 gap-2 w-full">
                  {movie.genre_ids?.map((id) => (
                    <div
                      key={id}
                      className="inline-block px-3 py-2 bg-white/10 text-white rounded-full text-xs backdrop-blur"
                    >
                      {genres.find((genre) => genre.id === id)?.name}
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button
                    className="flex items-center gap-2 p-6 rounded-full text-neutral-950 bg-neutral-100"
                    onClick={() => {
                      console.log(movie);

                      onClick(movies[currentIndex]);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Watch Trailer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </AspectRatio>

      <div className="absolute -bottom-8 left-1/2 justify-center transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            } ${index === currentIndex ? "w-4" : "w-2"} h-2`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <div className="flex absolute right-0 -bottom-12 space-x-4">
        <motion.button
          className="p-2 rounded-full bg-white hover:bg-neutral-950 hover:outline hover:outline-white hover:text-neutral-200 transition duration-300"
          onClick={previousMovie}
          whileTap={{ scale: 0.9 }} // Apply click animation
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </motion.button>
        <motion.button
          className="p-2 rounded-full bg-white hover:bg-neutral-950 hover:outline hover:outline-white hover:text-neutral-200 transition duration-300"
          onClick={nextMovie}
          whileTap={{ scale: 0.9 }} // Apply click animation
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </motion.button>
      </div>
    </main>
  );
};
