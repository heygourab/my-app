"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Review } from "types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export const CardStack = ({
  items,
  offset = 10,
  scaleFactor = 0.06,
  className = "",
}: {
  items: Review[];
  offset?: number;
  scaleFactor?: number;
  className?: string;
}) => {
  const CARD_OFFSET = offset;
  const SCALE_FACTOR = scaleFactor;
  const [cards, setCards] = useState<Review[]>(items);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startFlipping = useCallback(() => {
    stopFlipping(); // Clear existing interval
    intervalRef.current = setInterval(() => {
      setCards((prevCards) => {
        const [last, ...rest] = prevCards
          .slice(-1)
          .concat(prevCards.slice(0, -1));
        return [last, ...rest];
      });
    }, 3000);
  }, []);

  const stopFlipping = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startFlipping();
    return () => stopFlipping(); // Cleanup
  }, [cards, startFlipping]);

  return (
    <div className={`relative h-60 w-60 md:h-60 md:w-96 `}>
      {cards.map((card, index) => (
        <motion.div
          key={card.id || index}
          className={`absolute h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 flex flex-col justify-between shadow-lg ${className}`}
          style={{
            transformOrigin: "top center",
          }}
          animate={{
            top: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR,
            zIndex: cards.length - index,
            opacity: index === 0 ? 1 : 0.8, // Enhance focus on the top card
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <div className="font-normal text-sm text-neutral-200">
            {card.content
              .replace(/<\/?[^>]+(>|$)/g, "")
              .replace(/https?:\/\/\S+/g, "")
              .split(" ")
              .slice(0, 50)
              .join(" ")}
            ...
          </div>
          <div className="flex items-center gap-x-4">
            <Avatar>
              <AvatarImage
                className="flex-shrink-0 rounded-full size-10"
                src="https://www.themoviedb.org/t/p/w64_and_h64_face/klZ9hebmc8biG1RC4WmzNFnciJN.jpg"
                alt="avatar"
              />
              <AvatarFallback>💭</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-neutral-400 font-medium">
                {card.author_details.name.length >= 3
                  ? card.author_details.name
                  : `@${card.author_details.username}`}
              </p>
              <p className="text-neutral-400 text-sm font-normal">
                {new Date(card.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
