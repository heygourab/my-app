import { Language, MovieType, TVShow } from "types";
import { useMemo } from "react";
import { genres } from "@/data/movieGenereData.json";
import { languages } from "@/data/languageData.json";

export const useHomePageHandlers = (state: {
  setSelectedGenreId: (id: number) => void;
  setSelectedMovieLanguage: (language: Language) => void;
  setSearchQuery: (query: string) => void;
  setSelectedMovie: (movie: MovieType | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setSelectedTvShow: (tvShow: TVShow | null) => void;
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

  const handleMovieClick = (movie: MovieType) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleTvShowClick = (tvShow: TVShow) => {
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
