"use client";

import { useTimerStore } from "@/stores/timer-store";
import { motion } from "framer-motion";

export const ModeTab = () => {
  const { mode, setMode } = useTimerStore();
  const modes = ["pomodoro", "stopwatch"] as const;

  return (
    <div className="flex gap-10">
      {modes.map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={`relative pb-1 text-sm font-bold tracking-tight uppercase transition-colors ${mode === m ? "text-[#FF4B5C]" : "text-gray-400 hover:text-gray-600"}`}>
          {m}
          {mode === m && (
            <motion.div
              layoutId="underline"
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FF4B5C]"
            />
          )}
        </button>
      ))}
    </div>
  );
};
