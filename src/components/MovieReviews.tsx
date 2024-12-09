import { Review } from "types";
import { CardStack } from "./ui/card-stack";
import { LoadingIndicator } from "./LoadingIndicator";

export const MovieReviews = ({
  reviews,
  loading,
  error,
  title = "Movie Reviews —",
  className,
}: {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  title?: string;
  className?: string;
}) => {
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className={`flex flex-col mt-4 ${className}`}>
      <h3 className="text-2xl text-neutral-200 font-semibold mb-12">{title}</h3>
      <CardStack
        className="border backdrop-blur-md md:w-3/4
          border-neutral-400 w-full "
        items={reviews}
      />
    </section>
  );
};
