import React from "react";
import { useHomePageState } from "@/handlers/useHomeState";
import { useHomePageHandlers } from "@/handlers/useHomePageHandlers";
import { useMovies } from "@/hooks/useMovie";
import { useLatestMovies } from "@/hooks/useLatestMovies";
import { useTrendingTVShows } from "@/hooks/useTvShow";
import { useFilteredMoviesByLanguage } from "@/hooks/useFilteredMoviesByLan";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Hero } from "@/views/home/components/Hero";
import { TendingSection } from "./components/TrendingSection";
import { TvShowSection } from "./components/TvShowSection";
import { FilterByLanMovie } from "./components/FilterByLanMovie";
import { DetailsModal } from "../../components/modal/DetailsModal";
import { placeHolderTexts } from "@/constants";

import { languages } from "@/data/languageData.json";
import { genres } from "@/data/movieGenereData.json";
import { SearchModal } from "@/components/modal/SearchModal";

export const HomePage: React.FC = () => {
  const state = useHomePageState();
  const handlers = useHomePageHandlers(state);

  const {
    movies,
    loading: moviesLoading,
    error: moviesError,
  } = useMovies(state.selectedGenreId);

  const {
    newMovies,
    loading: newMoviesLoading,
    error: newMoviesError,
  } = useLatestMovies();

  const { shows, loading } = useTrendingTVShows();

  const {
    filteredMovies,
    loading: moviesByLanguageLoading,
    error: moviesByLanguageError,
  } = useFilteredMoviesByLanguage(state.selectedMovieLanguage?.iso_639_1);

  return (
    <AuroraBackground className="bg-slate-950 flex flex-col items-center h-screen overflow-y-auto antialiased">
      <div className="relative px-6 flex flex-col min-h-full w-full items-center">
        <div className="w-full sticky pt-4 top-0 z-10">
          <PlaceholdersAndVanishInput
            placeholders={placeHolderTexts}
            onChange={handlers.handleChange}
            onSubmit={handlers.handleSearchSubmit}
          />
        </div>
        {/* Hero Section */}
        <Hero movies={newMovies} onClick={handlers.handleMovieClick} />
        {/* Trending Section */}
        <TendingSection
          genres={genres}
          movies={movies}
          selectedGenreId={state.selectedGenreId}
          handleGenreClick={handlers.handleGenreClick}
          loading={moviesLoading || newMoviesLoading}
          selectedGenre={handlers.selectedGenre}
          onCardClick={handlers.handleMovieClick}
        />
        {/* TV Show Section */}
        <TvShowSection
          shows={shows}
          loading={loading}
          onCardClick={handlers.handleTvShowClick}
        />
        {/* Filter by Language Section */}
        <FilterByLanMovie
          languages={languages}
          filterMoviesByLanguage={filteredMovies}
          selectedMovieLanguage={state.selectedMovieLanguage?.iso_639_1 || ""}
          handleLanClick={handlers.handleLanClick}
          loading={moviesByLanguageLoading}
          selectedLanguage={state.selectedMovieLanguage?.iso_639_1 || ""}
          error={moviesByLanguageError}
          originalLanguage={state.selectedMovieLanguage?.name || ""}
          onCardClick={handlers.handleMovieClick}
        />
      </div>

      {/* Modal Section */}
      {state.isModalOpen && (
        <DetailsModal
          movie={state.selectedMovie || undefined}
          show={state.selectedTvShow || undefined}
          onClose={handlers.handleCloseModal}
        />
      )}
      {/* Search Result Modal */}
      <SearchModal onClick={() => {}} />
    </AuroraBackground>
  );
};
