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
  //! set the state object
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

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.searchQuery.trim()) {
      // hit the backend api then add returned data to the state
      // ! todo --- add the backend api
      // const body = {
      //   search: state.searchQuery,
      // };
      //   try {
      //     // hit the backend api for result
      //     const response = await fetch("http://localhost:3001/search", {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(body),
      //     });
      //     if (!response.ok) {
      //       console.error("not ok");
      //       return;
      //     }
      //     const data = await response.json();
      //     console.log(data);
      //   } catch (error) {
      //     console.error("Error fetching data:", error);
      //   }
      // }
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
