import { AuroraBackground } from "@/components/ui/aurora-background";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { placeHolderTexts } from "@/constants";

import { Navigate, useLocation, useParams } from "react-router-dom";

export const RecommendationPage = () => {
  const { type, id } = useParams();
  const location = useLocation();

  if (!id) {
    return <Navigate to="/" />;
  }

  console.log(location);
  console.log(type, id, typeof id);

  return (
    <AuroraBackground className="bg-slate-950 h-screen overflow-y-auto antialiased">
      <div className="relative px-6 flex flex-col min-h-full w-full items-start">
        <div className="w-full sticky pt-4 top-0 z-10">
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
