import { LoadingIndicator } from "@/components/LoadingIndicator";
import { MovieCard } from "../../../components/MovieCard";
import { TVShow } from "types";

export const TvShowSection = ({
  shows,
  loading,
}: {
  shows: TVShow[];
  loading: boolean;
}) => (
  <section className="w-full mt-10 pb-4">
    <h2 className="text-4xl text-white font-semibold tracking-wide">
      Trending Tv Shows of the Week —
    </h2>
    <div className="grid w-full mt-4 grid-cols-6">
      {!loading ? (
        shows.map((show) => <MovieCard key={show.id} {...show} />)
      ) : (
        <LoadingIndicator />
      )}
    </div>
  </section>
);
