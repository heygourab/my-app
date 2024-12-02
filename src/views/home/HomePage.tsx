import React, { useMemo, useState } from "react";
import { useMovies } from "../../hooks/useMovie";
import { useLatestMovies } from "../../hooks/useLatestMovies";
import { AuroraBackground } from "../../components/ui/aurora-background";
import { PlaceholdersAndVanishInput } from "../../components/ui/placeholders-and-vanish-input";
import { genres } from "../../data/movieGenereData.json";
import { Hero } from "@/views/home/components/Hero";
import { TendingSection } from "./components/TrendingSection";
import { placeHolderTexts } from "../../constants";

export const HomePage: React.FC = () => {
  const [selectedGenreId, setSelectedGenreId] = useState<number>(28);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const words =
    "Discover the latest and greatest movies across various genres — ";

  return (
    <AuroraBackground className="bg-slate-950 h-screen overflow-y-auto">
      <div className="relative px-6 flex flex-col min-h-full w-full items-start">
        <div className="w-full sticky pt-4 top-0 z-10">
          <PlaceholdersAndVanishInput
            placeholders={placeHolderTexts}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>

        <Hero movies={newMovies} />

        <TendingSection
          words={words}
          genres={genres}
          movies={movies}
          selectedGenreId={selectedGenreId}
          handleGenreClick={handleGenreClick}
          loading={moviesLoading || newMoviesLoading}
          selectedGenre={selectedGenre}
        />
      </div>
    </AuroraBackground>
  );
};
