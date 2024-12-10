import { LoadingIndicator } from "@/components/LoadingIndicator";
import { PlayTrailer } from "@/components/PlayTrailer";
import { useFetchShowDetails } from "@/hooks/useFetchShowDetails";

import { Show } from "types";
import { ShowInfo } from "./ShowInfo";
import { ShowReviews } from "./ShowReviews";

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
      <div className="sm:mt-8  flex flex-col">
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
      </div>
    )
  );
};
