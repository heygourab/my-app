import { useState } from "react";
import { Language, MovieType, TVShow } from "types";

export const useHomePageState = () => {
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

  return {
    selectedGenreId,
    setSelectedGenreId,
    searchQuery,
    setSearchQuery,
    selectedMovie,
    setSelectedMovie,
    isModalOpen,
    setIsModalOpen,
    selectedTvShow,
    setSelectedTvShow,
    selectedMovieLanguage,
    setSelectedMovieLanguage,
  };
};
