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
import { Language } from "types";

export const HomePage: React.FC = () => {
  const [selectedGenreId, setSelectedGenreId] = useState<number>(28);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedMovieLanguage, setSelectedMovieLanguage] = useState<Language>({
    english_name: "English",
    iso_639_1: "en",
    name: "English",
  });

  // fetch trending tv shows
  const { shows, loading } = useTrendingTVShows();

  // fetch trending movies based on selected genre
  const {
    movies,
    loading: moviesLoading,
    error: moviesError,
  } = useMovies(selectedGenreId);

  // fetch latest movies
  const {
    newMovies,
    loading: newMoviesLoading,
    error: newMoviesError,
  } = useLatestMovies();

  // fetch trending movies based on selected language
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

  // Event handlers with improved type safety

  const handleGenreClick = (id: number) => {
    setSelectedGenreId(id);
  };

  const handleLanClick = (iso_639_1: string) => {
    const language = languages.find((lang) => lang.iso_639_1 === iso_639_1);
    if (language) {
      setSelectedMovieLanguage(language);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Search submitted:", searchQuery);
    }
  };

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
        <div className="w-full relative">
          <Hero movies={newMovies} />

          {/* TendingSection */}
          <TendingSection
            genres={genres}
            movies={movies}
            selectedGenreId={selectedGenreId}
            handleGenreClick={handleGenreClick}
            loading={moviesLoading || newMoviesLoading}
            selectedGenre={selectedGenre}
          />
          <TvShowSection shows={shows} loading={loading} />

          {/* api not working */}
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
      </div>
    </AuroraBackground>
  );
};
