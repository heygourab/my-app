
import { AuroraBackground } from "@/components/ui/aurora-background";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { placeHolderTexts } from "@/constants";
import { useFetchMovieDetails } from "@/hooks/useFetchMovieDetails";


import { Navigate, useLocation, useParams } from "react-router-dom";

export const RecommendationPage = () => {
  const { type, id } = useParams();
  const location = useLocation();

  const { movieDetails, loading, error } = useFetchMovieDetails(Number(id));

  if (!id || !type || !["movie", "show"].includes(type)) {
    return <Navigate to="/" />;
  }

  return (
    <AuroraBackground className="bg-slate-950 h-screen overflow-y-auto antialiased">
      <div className="relative  flex flex-col h-full w-full items-start">
        <div className="w-full absolute pt-4 px-4 top-0 z-10">
          <PlaceholdersAndVanishInput
            placeholders={placeHolderTexts}
            onChange={() => {}}
            onSubmit={() => {}}
          />
        </div>
      </div>
    </AuroraBackground>
  );
};
