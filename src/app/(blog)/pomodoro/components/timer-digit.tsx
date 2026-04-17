"use client";

import { AnimatePresence, motion } from "framer-motion";

export const TimerDigit = ({
  value,
  position,
  totalDigits,
}: {
  value: string;
  position: number;
  totalDigits: number;
}) => {
  const percentage = Math.round(
    ((totalDigits - position) / (totalDigits)) * 100,
  );

  return (
    <div className="relative w-[1ch] flex justify-center items-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: "80%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-80%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "circOut" }}
          className={`inline-block select-none leading-none`}
          style={{
            backgroundImage: `linear-gradient(to right,  #FF6B35 ${percentage}%,   #FF2B81)`,
            backgroundSize: "200% 100%",
            backgroundPosition: `${percentage}% center`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}>
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
