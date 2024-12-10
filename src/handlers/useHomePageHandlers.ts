import { SpokenLanguage, Movie, Show } from "types";
import { useMemo } from "react";
import { genres } from "@/data/movieGenereData.json";
import { languages } from "@/data/languageData.json";

export const useHomePageHandlers = (state: {
  setSelectedGenreId: (id: number) => void;
  setSelectedMovieLanguage: (language: SpokenLanguage) => void;
  setSearchQuery: (query: string) => void;
  setSelectedMovie: (movie: Movie | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setSelectedTvShow: (tvShow: Show | null) => void;
  selectedGenreId: number;
}) => {
  const {
    setSelectedGenreId,
    setSelectedMovieLanguage,
    setSearchQuery,
    setSelectedMovie,
    setIsModalOpen,
    setSelectedTvShow,
  } = state;

  const selectedGenre = useMemo(
    () =>
      genres.find((genre) => genre.id === state.selectedGenreId)?.name ||
      "Action",
    [state.selectedGenreId]
  );

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

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.searchQuery.trim()) {
      console.log("Search submitted:", state.searchQuery);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleTvShowClick = (tvShow: Show) => {
    setSelectedTvShow(tvShow);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
    setSelectedTvShow(null);
  };

  return {
    selectedGenre,
    handleGenreClick,
    handleLanClick,
    handleChange,
    handleSearchSubmit,
    handleMovieClick,
    handleTvShowClick,
    handleCloseModal,
  };
};
