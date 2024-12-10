import { LoadingIndicator } from "@/components/LoadingIndicator";
import { CardStack } from "@/components/ui/card-stack";
import { useFetchShowReviews } from "@/hooks/useFetchShowReviews";

export const ShowReviews = ({
  id,
  title,
  className,
}: {
  id: number;
  title?: string;
  className?: string;
}) => {
  const { reviews, loading, error } = useFetchShowReviews(id);

  if (loading) {
    return <LoadingIndicator title="Loading show reviews..." />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    reviews &&
    reviews.length > 0 && (
      <section className={`flex flex-col mt-4 ${className}`}>
        <h3
          className={`text-xl text-neutral-200 font-semibold ${
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
