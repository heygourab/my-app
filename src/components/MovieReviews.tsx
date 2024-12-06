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
    <section className="pl-4 ">
      <div className="flex flex-col justify-between h-full w-full">
        <h3 className="text-3xl w-full  text-neutral-200 font-semibold ">
          {title}
        </h3>
        <CardStack
          className="border backdrop-blur-md 
          border-neutral-400"
          items={reviews}
        />
      </div>
    </section>
  );
};
