"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
  return (
    <div className="flex justify-center items-center gap-6 md:gap-10 mt-8">
      {/* Restart button */}
      <Button
        variant="outline"
        size="icon"
        disabled={!activeRoutineId}
        className="w-14 h-14 rounded-full border-slate-300 hover:bg-slate-100"
        onClick={onRestart}
        title="Restart">
        <RotateCcw className="w-7 h-7 text-[#92a2b7]" />
      </Button>

      {/* Play/Pause button */}
      <motion.div
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}>
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
          {!isActive && !isPaused ? (
            <Play className="w-10 h-10 text-white" fill="white" />
          ) : isActive && isPaused ? (
            <Play className="w-10 h-10 text-white" fill="white" />
          ) : (
            <Pause className="w-10 h-10 text-white" fill="white" />
          )}
        </Button>
      </motion.div>

      {/* Skip button */}
      <Button
        variant="outline"
        size="icon"
        disabled={!activeRoutineId}
        className="w-14 h-14 rounded-full border-slate-300 hover:bg-slate-100"
        onClick={onSkip}
        title="Skip to next">
        <SkipForward className="w-7 h-7 text-[#92a2b7]" />
      </Button>
    </div>
  );
}
