import { useEffect, useState } from "react";
import { MovieType } from "types";
import { AspectRatio } from "../../../components/ui/aspect-ratio";
import { Button } from "../../../components/ui/button";
import { TextGenerateEffect } from "../../../components/ui/text-generate-effect";

export const Hero = ({ movies }: { movies: MovieType[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [movies.length]);

  return (
    <div className="w-full pt-4 relative">
      <AspectRatio ratio={19 / 6} className="overflow-hidden rounded-3xl">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={`${movie.title} Poster`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end">
              <div className="p-4">
                <h1 className="text-6xl md:text-8xl font-bold text-neutral-100">
                  {movie.title}
                </h1>
                <div className="w-full  md:w-2/3">
                  <TextGenerateEffect
                    words={movie.overview ?? ""}
                    className="font-normal text-neutral-400"
                    textClassName="text-base md:text-lg text-neutral-400 text-pretty"
                  />
                </div>

                <div className="mt-4">
                  <Button
                    className="flex items-center gap-2  p-6 rounded-full text-neutral-950 bg-neutral-100"
                    onClick={() => console.log("clicked")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                        clip-rule="evenodd"
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
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            className={` rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            } ${index === currentIndex ? "w-4" : "w-2"} h-2`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
