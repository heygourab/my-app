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
  createdBy,
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
      className={`flex sm:mt-4 flex-col gap-4 lg:pr-4 sm:flex-row ${className}`}
    >
      {posterPath && name && <Poster title={name} posterPath={posterPath} />}
      <h2 className="text-4xl tracking-wide text-neutral-200 font-bold">
        {name}
      </h2>
      {/* {tagline && <p className="text-sm text-neutral-400">{tagline}</p>} */}
      <div className="flex flex-col font-bold  items-start mt-4">
        {voteAverage && (
          <div className="flex items-center gap-2 pr-4">
            <StarIcon className="size-5 text-yellow-400" />
            <p className="text-neutral-200">{voteAverage.toFixed(1)} / 10</p>
          </div>
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
      {createdBy && (
        <section>
          <h3 className="text-xl font-semibold text-white mt-8">Created By</h3>
          <div className="overflow-x-auto whitespace-nowrap scrollbar-hide mb-4">
            <div className="flex gap-4 mt-4">
              {createdBy.map((creator) => (
                <div key={creator.id} className="inline-block">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${creator.profile_path}`}
                    alt={`${creator.name} poster`}
                    className="w-48 h-64 rounded-3xl object-cover"
                    loading="lazy"
                  />

                  <p className="truncate text-base text-center mt-2 font-medium tracking-wide capitalize text-neutral-200">
                    {creator.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {}
    </section>
  );
};
