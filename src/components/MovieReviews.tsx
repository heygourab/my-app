import { useFetchMovieReviews } from "@/hooks/useFectchMovieReviews";
import { MovieType } from "types";
import { CardStack } from "./ui/card-stack";

export const MovieReviews = ({ movie_id }: { movie_id: MovieType["id"] }) => {
  const { reviews, loading, error } = useFetchMovieReviews(movie_id);

  console.info(reviews);
  return (
    <section className="pl-4 ">
      <div className="flex flex-col justify-between h-full w-full">
        <h3 className="text-3xl w-full  text-neutral-200 font-semibold ">
          Movie Reviews —
        </h3>
        <CardStack
          className="border w-full border-neutral-400 bg-black/20 backdrop-blur-sm "
          items={[
            {
              id: 2,
              name: "Bob",
              designation: "Designer",
              content: <p>Card 2</p>,
            },
            {
              id: 3,
              name: "Charlie",
              designation: "Manager",
              content: <p>Card 3</p>,
            },
          ]}
        />
      </div>
    </section>
  );
};
