// src/handlers/homeHandlers.ts

import { Language } from "types";

// Handle genre selection
export const handleGenreClick = (
  setSelectedGenreId: React.Dispatch<React.SetStateAction<number>>,
  id: number
) => {
  setSelectedGenreId(id);
};

// Handle language selection
export const handleLanClick = (
  setSelectedMovieLanguage: React.Dispatch<React.SetStateAction<Language>>,
  languages: Language[],
  iso_639_1: string
) => {
  const language = languages.find((lang) => lang.iso_639_1 === iso_639_1);
  if (language) {
    setSelectedMovieLanguage(language);
  }
};

// Handle search query input change
export const handleChange = (
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  setSearchQuery(e.target.value);
};

// Handle form submission
export const onSubmit = (
  searchQuery: string,
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();
  if (searchQuery.trim()) {
    console.log("Search submitted:", searchQuery);
  }
};
