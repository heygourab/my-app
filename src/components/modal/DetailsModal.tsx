import { motion } from "framer-motion";
import { useRef } from "react";
import { X } from "lucide-react";
import { MotionButton } from "@/components/MotionBotton";

import { ArrowDownIcon } from "@heroicons/react/16/solid";
import { MovieDetails } from "./movie/MovieDetails";
import { ShowDetails } from "./show/ShowDetails";

export const DetailsModal = ({
  movieId,
  showId,
  onClose,
}: {
  movieId: number | undefined;
  showId?: number | undefined;
  onClose: () => void;
}) => {
  const scrollableRef = useRef<HTMLDivElement | null>(null);

  const handleScrollDown = () => {
    scrollableRef.current?.scrollBy({ top: 200, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/65 backdrop-blur-2xl flex items-center justify-center z-50 sm:p-12"
      role="dialog"
      aria-modal="true"
    >
      <MotionButton className="absolute top-4 z-50 right-4" onClick={onClose}>
        <X />
      </MotionButton>

      <div className="absolute hidden z-50 space-y-12 bottom-4 -right-2 sm:flex flex-col items-center">
        <span className="text-white rotate-90">Scroll Down</span>
        <MotionButton onClick={handleScrollDown}>
          <ArrowDownIcon className="w-6 h-6 text-black hover:text-white" />
        </MotionButton>
      </div>

      <div
        ref={scrollableRef}
        className="flex flex-col p-4 sm:p-6 w-full h-screen scrollbar-hide overflow-y-auto"
      >
        {movieId && <MovieDetails id={movieId} />}
        {showId && <ShowDetails id={showId} />}
      </div>
    </motion.div>
  );
};
