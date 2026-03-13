"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";

interface ControlButtonProps {
  activeRoutineId: number | null;
  isPaused: boolean;
  isActive: boolean;
  onRestart: () => void;
  onTogglePause: () => void;
  onSkip: () => void;
}

export default function ControlButtons({
  activeRoutineId,
  isPaused,
  isActive,
  onRestart,
  onTogglePause,
  onSkip,
}: ControlButtonProps) {
  const springConfig: Transition = {
    type: "spring",
    stiffness: 400,
    damping: 20,
  };
  

  return (
    <div className="flex justify-center items-center gap-6 md:gap-10 mt-8">
      {/* Restart button */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: -30 }}
        whileTap={{ scale: 0.9 }}
        transition={springConfig}>
        <Button
          variant="outline"
          size="icon"
          disabled={!activeRoutineId}
          className="w-14 h-14 rounded-full border-slate-300 hover:bg-slate-100"
          onClick={onRestart}
          title="Restart">
          <RotateCcw className="w-7 h-7 text-[#92a2b7]" />
        </Button>
      </motion.div>

      {/* Play/Pause button */}
      <motion.div
        animate={activeRoutineId ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={springConfig}>
          <Button
            variant="outline"
            size="icon"
            disabled={!activeRoutineId}
            className={`w-20 h-20 rounded-full shadow-lg transition-all ${isPaused ? "bg-linear-to-br from-[#ef611a] to-[#fc7836] hover:from-[#fc7836] hover:to-[#ef611a]" : "bg-linear-to-br from-[#fc7836] to-[#ef611a] hover:from-[#ef611a] hover:to-[#fc7836]"}`}
            onClick={onTogglePause}
            title={
              !isActive && !isPaused
                ? "Play"
                : isActive && isPaused
                  ? "Play"
                  : "Pause"
            }>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isActive && !isPaused ? "pause" : "play"}
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                transition={{ duration: 0.2 }}>
                {!isActive && !isPaused ? (
                  <Play className="w-10 h-10 text-white" fill="white" />
                ) : isActive && isPaused ? (
                  <Play className="w-10 h-10 text-white" fill="white" />
                ) : (
                  <Pause className="w-10 h-10 text-white" fill="white" />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>
        </motion.div>
      </motion.div>

      {/* Skip button */}
      <motion.div
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={springConfig}>
        <Button
          variant="outline"
          size="icon"
          disabled={!activeRoutineId}
          className="w-14 h-14 rounded-full border-slate-300 hover:bg-slate-100"
          onClick={onSkip}
          title="Skip to next">
          <SkipForward className="w-7 h-7 text-[#92a2b7]" />
        </Button>
      </motion.div>
    </div>
  );
}
