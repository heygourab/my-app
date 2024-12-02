import React, { useEffect, useState, useCallback, useMemo } from "react";

import { AuroraBackground } from "../../components/ui/aurora-background";
import { PlaceholdersAndVanishInput } from "../../components/ui/placeholders-and-vanish-input";
import { placeHolderTexts } from "../../constants";
import { genres } from "../../data/movieGenereData.json";
import axios from "axios";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

import MovieList from "./components/MovieList";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Hero } from "@/views/home/components/Hero";

// Environment configuration (ideally moved to .env file)
const API_KEY = "532f22a5b395e0cc6588f24e273cb8b0";
const BASE_URL = "https://api.themoviedb.org/3";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date?: string;
  backdrop_path?: string;
}

export const HomePage: React.FC = () => {
  // State management with more precise typing
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState<Movie | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenreId, setSelectedGenreId] = useState<number>(28);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Memoized genre selection
  const selectedGenre = useMemo(
    () =>
      genres.find((genre) => genre.id === selectedGenreId)?.name || "Action",
    [selectedGenreId]
  );

  // Optimized fetch function with error handling
  const fetchMoviesByGenre = useCallback(async (genreId: number) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          sort_by: "popularity.desc",
          with_genres: genreId,
          page: 1,
        },
      });

      setMovies(response.data.results.slice(0, 14));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch newly released movies
  const fetchNewlyReleasedMovie = useCallback(async () => {
    try {
      const url = `${BASE_URL}/movie/now_playing`;
      const response = await axios.get(url, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page: 1,
        },
      });

      if (
        response.data &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        // Select the first movie or the most popular from newly released
        const featuredMovie = response.data.results[0];
        setNewMovie(featuredMovie);
      }
    } catch (error) {
      console.error(
        "Error fetching newly released movie:",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }, []);

  // Event handlers with improved type safety
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement search functionality
    if (searchQuery.trim()) {
      // TODO: Implement search logic
      console.log("Search submitted:", searchQuery);
    }
  };

  const handleGenreClick = (id: number) => {
    setSelectedGenreId(id);
  };

  // Main data fetching effect
  useEffect(() => {
    fetchMoviesByGenre(selectedGenreId);
    fetchNewlyReleasedMovie();
  }, [selectedGenreId, fetchMoviesByGenre, fetchNewlyReleasedMovie]);

  // Error state handler
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-red-500">
        {error}
      </div>
    );
  }

  const words =
    "Discover the latest and greatest movies across various genres — ";

  return (
    // Make the container scrollable with overflow-y-auto
    <AuroraBackground className="bg-slate-950 h-screen overflow-y-auto">
      <div className="relative px-6 flex flex-col min-h-full w-full items-start">
        <div className="w-full sticky pt-4 top-0 z-10">
          <PlaceholdersAndVanishInput
            placeholders={placeHolderTexts}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>

        <Hero newRelMovie={newMovie} />

        <div className="w-full mt-6 flex-grow">
          <TextGenerateEffect
            words={words}
            className="font-semibold"
            fontSize="3xl"
          />
          <div>
            <div className="w-full mt-4 overflow-x-auto whitespace-nowrap scrollbar-hide mb-4 top-20 z-10 ">
              <div className="inline-flex gap-4">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreClick(genre.id)}
                    className={`px-4 py-2 border rounded-full text-sm transition-colors duration-200 ${
                      selectedGenreId === genre.id
                        ? "bg-black text-neutral-100"
                        : "bg-neutral-200 text-black border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Movies Section */}
            {loading ? (
              <LoadingIndicator />
            ) : (
              <MovieList movies={movies} name={selectedGenre} />
            )}
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default HomePage;
