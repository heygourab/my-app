import { Review } from "types";
import { CardStack } from "./ui/card-stack";

export const MovieReviews = ({
  reviews,
  loading,
  error,
  title = "Movie Reviews —",
}: {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  title?: string;
}) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
 
  return (
    <section className="flex flex-col mt-6">
      <h3 className="text-2xl text-neutral-200 font-semibold mb-12">{title}</h3>
      <CardStack
        className="border backdrop-blur-md md:w-3/4
          border-neutral-400 w-full "
        items={reviews}
      />
    </section>
  );
};
