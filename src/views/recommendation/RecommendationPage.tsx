import { AuroraBackground } from "@/components/ui/aurora-background";
import { demoMoveList } from "@/constants";
import { MovieType } from "types";

// Note: Recommendation Page
export const RecommendationPage = ({
  movie = demoMoveList[0],
}: {
  movie?: MovieType;
}) => {
  return (
    <AuroraBackground className="bg-slate-950 h-screen overflow-y-auto antialiased ">
      {undefined}
    </AuroraBackground>
  );
};
