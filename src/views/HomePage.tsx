import React, { useEffect, useState } from "react";
import MovieCategory from "../components/MovieCategory";
import { AuroraBackground } from "../components/ui/aurora-background";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { placeHolderTexts } from "../constants";
import { genres } from "../data/movieGenereData.json";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenreId, setSelectedGenreId] = useState<number>(28);
  const [selectedGenre, setSelectedGenre] = useState<string>("Action");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement search functionality if needed
    console.log("Search submitted:", searchQuery);
  };

  const fetchMoviesByGenre = async (genreId: number) => {
    try {
      const API_KEY = "532f22a5b395e0cc6588f24e273cb8b0"; // Use environment variable
      const BASE_URL = "https://api.themoviedb.org/3";

      // Find the genre name
      const currentGenre = genres.find((genre) => genre.id === genreId);
      setSelectedGenre(currentGenre?.name || "Action");

      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          sort_by: "popularity.desc",
          with_genres: genreId,
          page: 1,
        },
      });

      setMovies(response.data.results.slice(0, 6));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch movies");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesByGenre(selectedGenreId);
  }, [selectedGenreId]);

  const handleGenreClick = (id: number) => {
    setSelectedGenreId(id);
    setLoading(true);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <AuroraBackground className="bg-slate-950 h-screen p-8">
      <div className="relative flex flex-col h-screen w-full items-start justify-between">
        {/* Input Section */}
        <PlaceholdersAndVanishInput
          placeholders={placeHolderTexts}
          onChange={handleChange}
          onSubmit={onSubmit}
        />

        {/* Genre Buttons */}
        <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide mb-4">
          <div className="inline-flex space-x-2">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreClick(genre.id)}
                className={`px-4 py-2 border rounded-full text-sm transition-colors duration-200 ${
                  selectedGenreId === genre.id
                    ? "bg-black text-white"
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {/* Movies Section */}
        {loading ? (
          <div className="flex items-center justify-center w-full h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
          </div>
        ) : (
          <MovieCategory movies={movies} name={selectedGenre} />
        )}
      </div>
    </AuroraBackground>
  );
};

export default HomePage;
