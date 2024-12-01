import MovieCategory from "../components/MovieCategory";
import { AuroraBackground } from "../components/ui/aurora-background";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { demoMoveList, placeHolderTexts } from "../constants";

export const HomePage = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <>
      <AuroraBackground className="bg-zinc-900 p-4">
        <div className="relative flex flex-col h-screen w-full items-start justify-between">
          {/* Input Section */}
          <PlaceholdersAndVanishInput
            placeholders={placeHolderTexts}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
          <div>
            <div className="w-max rounded-2xl bg-slate-400 p-5">
              <p className="flex items-center gap-2 text-white">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Trending
              </p>
            </div>

            <MovieCategory movies={demoMoveList} name="Animated" />
          </div>
        </div>
      </AuroraBackground>
    </>
  );
};

export default HomePage;
