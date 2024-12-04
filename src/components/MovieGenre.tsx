import { MovieType } from "types";
import { genres } from "@/data/movieGenereData.json";

export const MovieGenre = ({
  genresList,
}: {
  genresList: MovieType["genre_ids"];
}) => (
  <div className="flex mt-6 gap-2 w-full">
    {genresList?.map((id) => (
      <div
        key={id}
        className="inline-block px-3 py-2 bg-white/10 text-white rounded-full text-xs backdrop-blur"
      >
        {genres.find((genre) => genre.id === id)?.name}
      </div>
    ))}
  </div>
);
