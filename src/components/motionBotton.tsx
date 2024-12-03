import { motion } from "framer-motion";

export const MotionButton = ({
  onClick,
  children,
  className = "",
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.button
    className={`p-2 rounded-full bg-white hover:bg-neutral-950 hover:outline hover:outline-white hover:text-neutral-200 transition duration-300 ${className}`}
    onClick={onClick}
    whileTap={{ scale: 0.9 }} // Apply click animation
  >
    {children}
  </motion.button>
);
