"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";

interface ControlButtonProps {
  activeRoutineId: number | null;
  isPaused: boolean;
  onRestart: () => void;
  onTogglePause: () => void;
  onSkip: () => void;
}

export default function ControlButtons({
  activeRoutineId,
  isPaused,
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
        <RotateCcw className="w-7 h-7 text-slate-700" />
      </Button>

      {/* Play/Pause button */}
      <motion.div
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}>
        <Button
          variant="outline"
          size="icon"
          disabled={!activeRoutineId}
          className={`w-20 h-20 rounded-full shadow-lg transition-all ${isPaused ? "bg-linear-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600" : "bg-linear-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"}`}
          onClick={onTogglePause}
          title={isPaused ? "Play" : "Pause"}>
          {isPaused ? (
            <Play className="w-10 h-10 ml-1" fill="white" />
          ) : (
            <Pause className="w-10 h-10" fill="white" />
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
        <SkipForward className="w-7 h-7 text-slate-700" />
      </Button>
    </div>
  );
}
