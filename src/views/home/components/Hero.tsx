import { MovieType } from "types";
import { AspectRatio } from "../../../components/ui/aspect-ratio";
import { TextGenerateEffect } from "../../../components/ui/text-generate-effect";

export const Hero = ({ newRelMovie }: { newRelMovie: MovieType }) => {
  return (
    newRelMovie && (
      <div className="w-full pt-4">
        <AspectRatio ratio={19 / 6} className="overflow-hidden rounded-3xl">
          <img
            src={`https://image.tmdb.org/t/p/original${newRelMovie.backdrop_path}`}
            alt={`${newRelMovie.title} Poster`}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent  flex flex-col justify-end">
            <div className="p-4">
              <h1 className="text-8xl font-bold text-neutral-100">
                {newRelMovie.title}
              </h1>
              <div className="w-1/2">
                <TextGenerateEffect
                  words={newRelMovie.overview ?? ""}
                  className="font-normal text-neutral-400"
                  textClassName="text-lg text-neutral-400 text-pretty "
                />
              </div>

              <div className="w-dvw mt-4">
                <button className="flex flex-shrink p-2 gap-1  rounded-full bg-white">
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
                </button>
              </div>
            </div>
          </div>
        </AspectRatio>
      </div>
    )
  );
};
