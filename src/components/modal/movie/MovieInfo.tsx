import { StarIcon } from "@heroicons/react/16/solid";
import { TextGenerateEffect } from "../../ui/text-generate-effect";
import { Genre } from "types";

export const MovieInfo = ({
  posterPath,
  voteAverage,
  releaseDate,
  overview,
  title,
  genres,
  tagline,
}: {
  posterPath?: string | undefined;
  voteAverage?: number | undefined;
  releaseDate?: string | undefined;
  overview?: string | undefined;
  title: string | undefined;
  genres?: Genre[];
  tagline?: string | undefined;
}) => (
  <section className="flex mt-4 flex-col gap-4 lg:pr-4 sm:flex-row">
    {posterPath && (
      <img
        src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
        alt={`${title} Poster`}
        className="w-48 h-64  rounded-3xl object-cover"
        loading="lazy"
      />
    )}
    <div>
      <h2 className="text-4xl tracking-wide  text-neutral-200 font-bold">
        {title}
      </h2>
      <p className="text-sm text-neutral-400 font-serif">{tagline}</p>
      <div className="flex font-bold text-lg  items-center gap-1 divide-x-2 divide-neutral-400  mt-4">
        {voteAverage && (
          <div className="flex items-center gap-2 pr-4">
            <StarIcon className="size-5 text-yellow-400" />
            <p className="text-neutral-200">{voteAverage.toFixed(1)} / 10</p>
          </div>
        )}
        {releaseDate && <p className="pl-4 text-neutral-200">{releaseDate}</p>}
      </div>
      {overview && (
        <TextGenerateEffect
          className="font-normal"
          words={overview}
          textClassName="text-sm text-neutral-400"
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
