import { demoMoveList } from "@/constants";
import { SimilarMovies } from "./movie/Similar";
import { MovieCard } from "../MovieCard";
import { MotionButton } from "../MotionBotton";
import { X } from "lucide-react";

export const SearchModal = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="h-3/4 p-4 top-16 flex-col overflow-y-auto  mx-4 my-4 items-start rounded-3xl overflow-hidden fixed inset-0 bg-black/65 z-50 flex backdrop-blur-2xl border border-neutral-400">
      <MotionButton className="absolute top-4 right-4" onClick={onClick}>
        <X />
      </MotionButton>

      <h3 className="text-2xl text-neutral-200 font-bold">Search Result —</h3>
      <MovieCard
        poster_path={demoMoveList[0].poster_path ?? ""}
        title={demoMoveList[0].title ?? ""}
        vote_average={0}
      />
      <div className="w-full mt-4 ">
        <SimilarMovies
          movieId={demoMoveList[0].id}
          movieLanguage={demoMoveList[0].original_language}
          className=""
        />
      </div>
    </div>
  );
};
