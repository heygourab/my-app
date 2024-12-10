import { MovieGenre } from "@/components/MovieGenre";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { demoMoveList, placeHolderTexts } from "@/constants";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { MovieType } from "types";

export const RecommendationPage = ({
  movie = demoMoveList[0],
}: {
  movie?: MovieType;
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Search Submitted:", searchQuery);
    // Add further submit logic
  };

  return (
    <AuroraBackground className="bg-slate-950 h-screen overflow-y-auto antialiased ">
      {undefined}
    </AuroraBackground>
  );
};
