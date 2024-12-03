import { LoadingIndicator } from "@/components/LoadingIndicator";
import MovieList from "../../../components/MovieList";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Genres, MovieType } from "types";

export const TendingSection = ({
  genres,
  movies,
  selectedGenreId,
  handleGenreClick,
  loading,
  selectedGenre,
  onCardClick,
}: {
  genres: Genres[];
  movies: MovieType[];
  selectedGenreId: number;
  handleGenreClick: (id: number) => void;
  loading: boolean;
  selectedGenre: string;
  onCardClick: (movie: MovieType) => void;
}) => {
  const words =
    "Discover the latest and greatest movies across various genres — ";

  return (
    <section className="w-full mt-16 flex-grow">
      <TextGenerateEffect words={words} className="font-semibold" fontSize="" />
      <div>
        <div className="w-full mt-4 overflow-x-auto whitespace-nowrap scrollbar-hide mb-4 top-20 z-10 ">
          <div className="inline-flex gap-4">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreClick(genre.id)}
                className={`px-4 py-2 border rounded-full text-sm transition-colors duration-200 ${
                  selectedGenreId === genre.id
                    ? "bg-black text-neutral-100"
                    : "bg-neutral-200 text-black border-gray-300 hover:bg-gray-100"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {/* Movies Section */}
        {loading ? (
          <LoadingIndicator />
        ) : (
          <MovieList
            movies={movies}
            name={selectedGenre}
            onCardClick={onCardClick}
          />
        )}
      </div>
    </section>
  );
};
