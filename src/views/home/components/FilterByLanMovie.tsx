import { LoadingIndicator } from "@/components/LoadingIndicator";
import { SpokenLanguage, Movie } from "types";
import MovieList from "@/components/modal/movie/MovieList";

export const FilterByLanMovie = ({
  languages,
  filterMoviesByLanguage,
  handleLanClick,
  loading,
  selectedLanguage,
  originalLanguage,
  onCardClick,
  error,
}: {
  languages: SpokenLanguage[];
  filterMoviesByLanguage: Movie[];
  selectedMovieLanguage: SpokenLanguage["iso_639_1"];
  handleLanClick: (iso_639_1: SpokenLanguage["iso_639_1"]) => void;
  loading: boolean;
  selectedLanguage: string;
  originalLanguage: SpokenLanguage["name"];
  onCardClick: (movie: Movie) => void;
  error?: string | null;
}) => {
  return (
    <section className="w-full mt-16 flex-grow">
      <h2 className=" text-4xl font-semibold text-white">
        Choose Your Language, Enjoy Your Movies —
      </h2>
      <div className="w-full mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8  lg:grid-cols-7 gap-4 mb-4 top-20 z-10 text-center ">
        {languages.map((language) => (
          <button
            key={language.iso_639_1}
            className={`px-4 py-2 border rounded-full text-sm transition-colors duration-200 text-center ${
              selectedLanguage === language.iso_639_1
                ? "bg-black text-neutral-100"
                : "bg-neutral-200 text-black outline-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => handleLanClick(language.iso_639_1)}
          >
            {language.name}
          </button>
        ))}
      </div>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <MovieList
          movies={filterMoviesByLanguage}
          name={originalLanguage}
          onCardClick={onCardClick}
        />
      )}
    </section>
  );
};
