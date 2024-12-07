{/_<div
className={`w-full flex divide-x-2 divide-neutral-400 divide-dotted mt-8`} >
{/_ movie poster _/}
{/_ <div className={`flex gap-4`}>
{posterPath && (
<img
src={posterPath}
alt={`${title} Poster`}
className="w-56 h-80 rounded-3xl object-cover"
loading="lazy"
/>
)}
{/_movie metadata_/}
{/_<div
className={`flex flex-col ${
                !reviews.length ? "w-2/3" : "w-full"
              } pr-4`} >
<h2 className="text-5xl text-neutral-200 font-bold">{title}</h2>
<div className="flex font-bold items-center gap-2 divide-x-2 divide-neutral-200 text-base mt-2">
{voteAverage && (
<div className="flex items-center gap-2 pr-4">
<StarIcon className="size-5 text-yellow-400" />
<p className="text-neutral-400">{voteAverage} / 10</p>
</div>
)}
{releaseDate && (
<p className="pl-4 text-neutral-400">{releaseDate}</p>
)}
</div> _/}
{/_ {movie?.overview && (
<TextGenerateEffect
                  className="font-normal mt-2"
                  words={movie.overview}
                  textClassName="text-sm text-neutral-300"
                />
)}
<div className="flex mt-6 gap-2 w-full flex-wrap">
{movie?.genre_ids?.map((id) => {
const genre = genres.find((g) => g.id === id);
return (
genre && (
<span
                        key={id}
                        className="inline-block px-3 py-2 bg-white/10 text-white rounded-full text-xs"
                      >
{genre.name}
</span>
)
);
})}
</div>
</div>
</div> _/}
{/_ {movie?.id && reviews.length && (
<MovieReviews reviews={reviews} loading={loading} error={error} />
)}
// </div>_/}
