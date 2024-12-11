import { Poster } from "@/components/Poster";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { StarIcon } from "@heroicons/react/16/solid";
import { ShowDetails } from "types";

export const ShowInfo = ({
  posterPath,
  name,
  tagline,
  voteAverage,
  firstAirDate,
  lastAirDate,
  overview,
  genres,
  className,
}: {
  posterPath: ShowDetails["poster_path"];

  name: ShowDetails["name"];
  tagline: ShowDetails["tagline"];
  voteAverage: ShowDetails["vote_average"];
  firstAirDate: ShowDetails["first_air_date"];
  lastAirDate: ShowDetails["last_air_date"];
  overview: ShowDetails["overview"];
  genres: ShowDetails["genres"];
  createdBy: ShowDetails["created_by"];
  className?: string;
}) => {
  return (
    <section
      className={`flex sm:mt-4 flex-col gap-4 sm:flex-row lg:pr-4  ${className}`}
    >
      {posterPath && name && <Poster title={name} posterPath={posterPath} />}
      <div>
        <h2 className="text-4xl tracking-wide text-neutral-200 font-bold">
          {name}
        </h2>
        {tagline && <p className="text-sm text-neutral-400">{tagline}</p>}
        <div className="flex flex-col font-bold  items-start mt-2">
          {voteAverage && (
            <div className="flex items-center gap-2 pr-4">
              <StarIcon className="size-5 text-yellow-400" />
              <p className="text-neutral-200 text-xl">
                {voteAverage.toFixed(1)} / 10
              </p>
            </div>
          )}
        </div>
        <div className="flex divide-x-2 gap-2 mt-2">
          {firstAirDate && (
            <p className="text-base text-neutral-200 font-semibold">
              {firstAirDate}
            </p>
          )}
          {lastAirDate && (
            <p className="text-base pl-2 text-neutral-200">
              Last aired:{" "}
              <span className="text-neutral-400 font-semibold">
                {lastAirDate}
              </span>
            </p>
          )}
        </div>
        {overview && (
          <TextGenerateEffect
            className="font-normal"
            textClassName="text-sm text-neutral-400"
            words={overview}
          />
        )}
        {genres && (
          <div className="flex mt-4 gap-2 w-full flex-wrap">
            {genres.map((genre) => (
              <span
                key={genre.id}
                className="inline-block px-3 py-2 bg-white/10 text-white rounded-full text-xs backdrop-blur"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}
      </div>
      
    </section>
  );
};
