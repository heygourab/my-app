export const Poster = ({
  title,
  posterPath,
}: {
  title: string;
  posterPath: string;
}) => {
  return (
    <img
      src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
      alt={`${title} Poster`}
      className="w-48 h-64  rounded-3xl object-cover"
      loading="lazy"
    />
  );
};
