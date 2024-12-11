import { LoadingIndicator } from "@/components/LoadingIndicator";
import { PlayTrailer } from "@/components/PlayTrailer";
import { useFetchShowDetails } from "@/hooks/useFetchShowDetails";

import { Show } from "types";
import { ShowInfo } from "./ShowInfo";
import { ShowReviews } from "./ShowReviews";
import { RecommendedShow } from "./RecomenedShow";

export const ShowDetails = ({ show }: { show: Show }) => {
  const { showDetails, loading, error } = useFetchShowDetails(show.id);

  if (loading) {
    return <LoadingIndicator title="Loading show details..." />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  console.log(showDetails);
  return (
    showDetails && (
      <div className="sm:mt-8 flex flex-col">
        <PlayTrailer
          className="order-2 mt-4 sm:mt-0 sm:order-1"
          title={showDetails.name ?? undefined}
        />
        <section className="order-1 sm:order-1 flex w-full flex-col md:flex-col lg:divide-x-2 lg:flex-row">
          <ShowInfo
            posterPath={showDetails.poster_path}
            name={showDetails.name}
            tagline={showDetails.tagline}
            voteAverage={showDetails.vote_average}
            firstAirDate={showDetails.first_air_date}
            lastAirDate={showDetails.last_air_date}
            overview={showDetails.overview}
            genres={showDetails.genres}
            createdBy={showDetails.created_by}
          />
          {showDetails.id && (
            <ShowReviews
              id={show.id}
              className="sm:pl-4 mt-8"
              title={"Show Reviews"}
            />
          )}
        </section>
        {showDetails.created_by && (
          <section className="order-3">
            <h3 className="text-xl font-semibold text-white mt-8">
              Created By
            </h3>
            <div className="overflow-x-auto whitespace-nowrap scrollbar-hide mb-4">
              <div className="flex gap-4 mt-4">
                {showDetails.created_by.map((creator) => (
                  <div key={creator.id} className="inline-block">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${creator.profile_path}`}
                      alt={`${creator.name} poster`}
                      className="w-48 h-64 rounded-3xl object-cover"
                      loading="lazy"
                    />
                    <p className="truncate text-base text-center mt-2 font-medium tracking-wide capitalize text-neutral-200">
                      {creator.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <RecommendedShow
          className="order-4"
          showId={showDetails.id}
          showLanguage={showDetails.original_language}
        />
      </div>
    )
  );
};
