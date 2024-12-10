import { CardStack } from "../ui/card-stack";
import { LoadingIndicator } from "../LoadingIndicator";
import { useFetchMovieReviews } from "@/hooks/useFetchMovieReviews";

export const MovieReviews = ({
  movieId,
  className,
}: {
  movieId: number;
  className?: string;
}) => {
  const { reviews, loading, error } = useFetchMovieReviews(movieId);
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    reviews &&
    reviews.length > 0 && (
      <section className={`flex flex-col mt-4 ${className}`}>
        <h3
          className={`text-2xl text-neutral-200 font-semibold ${
            reviews.length > 3 ? "mb-12" : "mb-4"
          }`}
        >
          Movie Reviews
        </h3>
        <CardStack
          className="border backdrop-blur-md md:w-3/4
          border-neutral-400 w-full"
          items={reviews}
        />
      </section>
    )
  );
};
