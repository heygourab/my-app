import React, { useMemo, useState } from "react";
import { useMovies } from "@/hooks/useMovie";
import { useLatestMovies } from "@/hooks/useLatestMovies";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { genres } from "@/data/movieGenereData.json";
import { Hero } from "@/views/home/components/Hero";
import { TendingSection } from "./components/TrendingSection";
import { placeHolderTexts } from "@/constants";
import { useTrendingTVShows } from "@/hooks/useTvShow";
import { TvShowSection } from "./components/TvShowSection";

import { languages } from "@/data/languageData.json";
import { FilterByLanMovie } from "./components/FilterByLanMovie";
import { useFilteredMoviesByLanguage } from "@/hooks/useFilteredMoviesByLan";
import { Language, MovieType, TVShow } from "types";
import { DetailsModal } from "./components/DetailsModal";

export const HomePage: React.FC = () => {
  const [selectedGenreId, setSelectedGenreId] = useState<number>(28);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedTvShow, setSelectedTvShow] = useState<TVShow | null>(null);

  const [selectedMovieLanguage, setSelectedMovieLanguage] = useState<Language>({
    english_name: "English",
    iso_639_1: "en",
    name: "English",
  });

  // Fetch data
  const { shows, loading: tvLoading } = useTrendingTVShows();
  const {
    movies,
    loading: moviesLoading,
    error: moviesError,
  } = useMovies(selectedGenreId);
  const {
    newMovies,
    loading: newMoviesLoading,
    error: newMoviesError,
  } = useLatestMovies();
  const {
    filteredMovies,
    loading: moviesByLanguageLoading,
    error: moviesByLanguageError,
  } = useFilteredMoviesByLanguage(selectedMovieLanguage?.iso_639_1);

  // Memoized genre selection
  const selectedGenre = useMemo(
    () =>
      genres.find((genre) => genre.id === selectedGenreId)?.name || "Action",
    [selectedGenreId]
  );

  // Event handlers
  const handleGenreClick = (id: number) => setSelectedGenreId(id);

  const handleLanClick = (iso_639_1: string) => {
    const language = languages.find((lang) => lang.iso_639_1 === iso_639_1);
    if (language) setSelectedMovieLanguage(language);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Search submitted:", searchQuery);
    }
  };

  const handleMovieClick = (movie: MovieType) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleTvShowClick = (show: TVShow) => {
    setSelectedTvShow(show);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
    setSelectedTvShow(null);
  };

  // Error handling
  if (moviesError || newMoviesError) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-red-500">
        {moviesError || newMoviesError}
      </div>
    );
  }

  return (
    <AuroraBackground className="bg-slate-950 h-screen overflow-y-auto antialiased">
      <div className="relative px-6 flex flex-col min-h-full w-full items-start">
        <div className="w-full sticky pt-4 top-0 z-10">
          <PlaceholdersAndVanishInput
            placeholders={placeHolderTexts}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>

        {/* Hero Section */}
        <Hero movies={newMovies} />

        {/* Trending Section */}
        <TendingSection
          genres={genres}
          movies={movies}
          selectedGenreId={selectedGenreId}
          handleGenreClick={handleGenreClick}
          loading={moviesLoading || newMoviesLoading}
          selectedGenre={selectedGenre}
          onCardClick={handleMovieClick}
        />

        {/* TV Show Section */}
        <TvShowSection
          shows={shows}
          loading={tvLoading}
          onCardClick={handleTvShowClick}
        />

        {/* Filter By Language Section */}
        <FilterByLanMovie
          languages={languages}
          filterMoviesByLanguage={filteredMovies}
          selectedMovieLanguage={selectedMovieLanguage.iso_639_1}
          handleLanClick={handleLanClick}
          loading={moviesByLanguageLoading}
          selectedLanguage={selectedMovieLanguage.iso_639_1}
          error={moviesByLanguageError}
          originalLanguage={selectedMovieLanguage.name}
        />
      </div>

      {/* Modal Section */}
      {isModalOpen && (
        <>
          {selectedMovie ? (
            <DetailsModal movie={selectedMovie} onClose={handleCloseModal} />
          ) : (
            selectedTvShow && (
              <DetailsModal
                tvShow={selectedTvShow}
                onClose={handleCloseModal}
              />
            )
          )}
        </>
      )}
    </AuroraBackground>
  );
};
