import { PlayTrailer } from "@/components/PlayTrailer";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Show } from "types";

export const ShowDetails = ({ show }: { show: Show }) => {
  
  return (
    <div className="sm:mt-8 flex flex-col">
      <PlayTrailer
        className="order-2 mt-8 sm:mt-0 sm:order-1"
        title={show.name}
      />
      <section className="order-1">
        {show.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
            alt={`${show.name} Poster`}
            className="w-48 h-64 rounded-3xl object-cover"
            loading="lazy"
          />
        )}
        <h2 className="text-4xl text-neutral-200 font-bold">{show.name}</h2>
        {show.overview && (
          <TextGenerateEffect
            className="font-normal"
            textClassName="text-sm text-neutral-400"
            words={show.overview}
          />
        )}
      </section>
    </div>
  );
};
