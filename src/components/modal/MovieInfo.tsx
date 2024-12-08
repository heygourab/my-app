import { StarIcon } from "@heroicons/react/16/solid";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { genres } from "@/data/movieGenereData.json";

export const MovieInfo = ({
  posterPath,
  voteAverage,
  releaseDate,
  overview,
  title,
  genreIds,
}: {
  posterPath?: string;
  voteAverage?: string;
  releaseDate?: string;
  overview?: string;
  title: string;
  genreIds?: number[];
}) => (
  <section className="flex mt-4 flex-col gap-4 lg:pr-4 sm:flex-row">
    {posterPath && (
      <img
        src={posterPath}
        alt={`${title} Poster`}
        className="w-48 h-64  rounded-3xl object-cover"
        loading="lazy"
      />
    )}
    <div>
      <h2 className="text-4xl tracking-wide  text-neutral-200 font-bold">
        {title}
      </h2>

      <div className="flex font-bold items-center gap-2 divide-x-2 divide-neutral-200 text-base mt-2">
        {voteAverage && (
          <div className="flex items-center gap-2 pr-4">
            <StarIcon className="size-5 text-yellow-400" />
            <p className="text-neutral-400">{voteAverage} / 10</p>
          </div>
        )}
        {releaseDate && <p className="pl-4 text-neutral-400">{releaseDate}</p>}
      </div>
      {overview && (
        <TextGenerateEffect
          className="font-normal"
          words={overview}
          textClassName="text-sm text-neutral-300"
        />
      )}

      <div className="flex mt-4 gap-2 w-full flex-wrap">
        {genreIds?.map((id) => {
          const genre = genres.find((g) => g.id === id);
          return (
            genre && (
              <span
                key={id}
                className="inline-block px-3 py-2 bg-white/10 text-white rounded-full text-xs"
              >
                {genre.name}
              </span>
            )
          );
        })}
      </div>
    </div>
  </section>
);
