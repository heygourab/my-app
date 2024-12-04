import { MovieGenre } from "@/components/MovieGenre";
import MovieList from "@/components/MovieList";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { demoMoveList, placeHolderTexts } from "@/constants";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { MovieType } from "types";

export const RecommendationPage = ({
  movie = demoMoveList[0],
}: {
  movie?: MovieType;
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Search Submitted:", searchQuery);
    // Add further submit logic
  };

  return (
    <AuroraBackground className="bg-slate-950 h-screen overflow-y-auto antialiased">
      <div className="relative flex flex-col items-start w-full min-h-full px-6">
        {/* Search Bar Section */}
        <header className="w-full sticky top-0 z-10 pt-4">
          <PlaceholdersAndVanishInput
            placeholders={placeHolderTexts}
            onChange={handleChange}
            onSubmit={handleSearchSubmit}
          />
        </header>

        {/* Main Section */}
        <main className="w-full ">
          <AspectRatio ratio={16 / 9} className="relative w-full h-2/3 mt-4">
            {/* Background Movie Poster */}
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt="Movie Poster"
              className="w-full h-full rounded-3xl object-cover"
              loading="lazy"
            />
            {/* Overlay Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent rounded-3xl" />
            {/* Overlay Image */}
            <div className="absolute left-4 transform -translate-y-1/2 w-3/5 h-96 gap-4  flex">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt="Overlay Poster"
                className="rounded-3xl z-10 shadow-md"
                loading="lazy"
              />
              <div className="flex flex-col">
                <h1 className="text-8xl font-extrabold text-neutral-100">
                  {movie.title}
                </h1>
                <p className="text-xl mt-4 text-neutral-400">
                  {movie.overview}
                </p>
                <MovieGenre genresList={movie.genre_ids} />
              </div>
            </div>
          </AspectRatio>
        </main>
        <div>
          <h2 className="text-4xl font-bold tracking-normal text-white ">
            Based on You Movie chouise we recommended —
          </h2>
          <MovieList
            name={""}
            movies={demoMoveList}
            isSubtitleShow={false}
            // on click based on this move recommendation open another recommendation page
            onCardClick={function (movie: MovieType): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>
    </AuroraBackground>
  );
};
