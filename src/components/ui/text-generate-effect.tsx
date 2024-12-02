"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  containerClassName?: string;
  textClassName?: string;
  filter?: boolean;
  duration?: number;
  fontSize?: string;
}

export const TextGenerateEffect = ({
  words,
  className,
  containerClassName,
  textClassName,
  filter = true,
  duration = 0.5,
  fontSize,
}: TextGenerateEffectProps) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration,
        delay: stagger(0.2),
      }
    );
  }, [animate, duration, filter]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={cn(
                "dark:text-white text-white opacity-0",
                textClassName
              )}
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className={cn("mt-4", containerClassName)}>
        <div
          className={cn(
            "dark:text-white text-black leading-snug text-4xl tracking-wide",
            // Dynamically add text size class if it's a standard Tailwind size
            fontSize &&
              /^(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/.test(
                fontSize
              )
              ? `text-${fontSize}`
              : "",
            textClassName
          )}
          // Use inline style for custom font sizes not in Tailwind's predefined sizes
          style={
            fontSize &&
            !/^(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/.test(
              fontSize
            )
              ? { fontSize }
              : undefined
          }
        >
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
