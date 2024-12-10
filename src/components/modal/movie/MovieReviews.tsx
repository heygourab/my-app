import { CardStack } from "../../ui/card-stack";
import { LoadingIndicator } from "../../LoadingIndicator";
import { useFetchMovieReviews } from "@/hooks/useFetchMovieReviews";

export const MovieReviews = ({
  id,
  title,
  className,
}: {
  id: number;
  title?: string;
  className?: string;
}) => {
  const { reviews, loading, error } = useFetchMovieReviews(id);
  if (loading) {
    return <LoadingIndicator title="Loading movie reviews..." />;
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
          {title ?? "Movie reviews"}
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
