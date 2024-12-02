import { MovieType } from "types";
import { AspectRatio } from "../../../components/ui/aspect-ratio";
import { TextGenerateEffect } from "../../../components/ui/text-generate-effect";

export const Hero = ({ newRelMovie }: { newRelMovie: MovieType }) => {
  return (
    newRelMovie && (
      <div className="w-full pt-4">
        <AspectRatio ratio={3 / 1} className="overflow-hidden rounded-3xl">
          <img
            src={`https://image.tmdb.org/t/p/original${newRelMovie.backdrop_path}`}
            alt={`${newRelMovie.title} Poster`}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent  flex flex-col justify-end">
            <div className="p-4">
              <h1 className="text-8xl font-bold text-neutral-100">
                {newRelMovie.title}
              </h1>
              <TextGenerateEffect
                words={newRelMovie.overview ?? ""}
                className="font-normal"
                fontSize="xl"
              />
            </div>
          </div>
        </AspectRatio>
      </div>
    )
  );
};
