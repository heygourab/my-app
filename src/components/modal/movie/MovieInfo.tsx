import { StarIcon } from "@heroicons/react/16/solid";
import { TextGenerateEffect } from "../../ui/text-generate-effect";
import { Genre } from "types";
import { Poster } from "@/components/Poster";

export const MovieInfo = ({
  posterPath,
  voteAverage,
  releaseDate,
  overview,
  title,
  genres,
  tagline,
  budget,
  revenue,
}: {
  posterPath?: string | undefined;
  voteAverage?: number | undefined;
  releaseDate?: string | undefined;
  overview?: string | undefined;
  title: string | undefined;
  genres?: Genre[];
  tagline?: string | undefined;
  budget?: number;
  revenue?: number;
}) => (
  <section className="flex sm:mt-4 flex-col gap-4 lg:pr-4 sm:flex-row">
    {posterPath && title && <Poster title={title} posterPath={posterPath} />}
    <div>
      <h2 className="text-4xl tracking-wide sm:text-5xl  text-neutral-200 font-bold">
        {title}
      </h2>
      <p className="text-sm text-neutral-400">{tagline}</p>
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

      <div className="flex divide-x-2 gap-2 ">
        {budget !== undefined && (
          <p className="font-semibold text-neutral-200 text-lg mt-4">
            Budget:{" "}
            <span className="text-neutral-400">
              {budget === 0
                ? "Unknown"
                : new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(budget)}
            </span>
          </p>
        )}
        {revenue !== undefined && (
          <p className="pl-2 font-semibold text-neutral-200 text-lg mt-4">
            Revenue:{" "}
            <span className="text-neutral-400">
              {revenue === 0
                ? "Unknown"
                : new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(revenue)}
            </span>
          </p>
        )}
      </div>

      {genres && (
        <div className="flex mt-4 gap-2 w-full flex-wrap">
          {genres.map((genre) => (
            <span
              key={genre.id}
              className="inline-block px-3 py-2 bg-white/20 text-white rounded-full text-xs backdrop-blur-sm"
            >
              {genre.name}
            </span>
          ))}
        </div>
      )}
    </div>
  </section>
);
