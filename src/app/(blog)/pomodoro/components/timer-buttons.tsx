// "use client";

// import { motion } from "framer-motion";

// export const TimerButtons = () => {
//   const { toggleTimer, isRunning, mode, resetTimer } = useTimerStore();

//   return (
//     <div className="flex gap-6 mt-20">
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileFocus={{ scale: 0.95 }}
//         onClick={toggleTimer}
//         className="h-16 px-12 rounded-2xl text-white text-xs font-bold tracking-widest uppercase bg-linear-to-r from-[#FF6B35] to-[#FF2B81] shadow-[0_10px_30px_rgba(255,43,129,0.3)]">
//         {isRunning ? "Pause" : "Start"} {mode}
//       </motion.button>
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileFocus={{ scale: 0.95 }}
//         onClick={resetTimer}
//         className="h-16 px-12 rounded-2xl border border-gray-200 bg-white/50 text-gray-500 text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors">
//         Reset
//       </motion.button>
//     </div>
//   );
// };

"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { Pause, Play, RotateCcw, Square } from "lucide-react";
import { useTimerStore } from "@/stores/timer-store";
import { useConfirm } from "@/hooks/use-confirm";

export const TimerButtons = () => {
  const confirm = useConfirm((state) => state.confirm);

  const {
    mode,
    isRunning,
    timeLeft,
    isActive,
    resetTimer,
    start,
    pause,
    resume,
    end,
  } = useTimerStore();

  const springConfig: Transition = {
    type: "spring",
    stiffness: 400,
    damping: 20,
  };

  const handleEnd = () => {
    if (mode === "stopwatch") {
      end();
    } else {
      if (timeLeft > 0) {
        pause();
        confirm(
          "End pomodoro?",
          "You're almost done! Really end this pomodoro?",
          () => {
            end();
          },
          () => {
            resume();
          },
        );
      } else {
        end();
      }
    }
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
          className="w-14 h-14 rounded-full border-slate-300 hover:bg-slate-100"
          onClick={resetTimer}
          title="Restart">
          <RotateCcw className="w-7 h-7 text-[#92a2b7]" />
        </Button>
      </motion.div>

      {/* Play/Pause button */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={springConfig}>
          <Button
            variant="outline"
            size="icon"
            className={`w-20 h-20 rounded-full shadow-lg transition-all ${isRunning ? "bg-linear-to-br from-[#FF6B35] to-[#FF2B81] hover:from-[#FF2B81] hover:to-[#FF6B35]" : "bg-linear-to-br from-[#FF2B81] to-[#FF6B35] hover:from-[#FF6B35] hover:to-[#FF2B81]"}`}
            onClick={() => {
              const unlock = new SpeechSynthesisUtterance("");
              window.speechSynthesis.speak(unlock);
              if (!isActive && !isRunning) {
                start();
              } else if (isActive && !isRunning) {
                resume();
              } else {
                pause();
              }
            }}
            title={
              !isActive && !isRunning
                ? "Play"
                : isActive && isRunning
                  ? "Play"
                  : "Pause"
            }>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isActive && !isRunning ? "pause" : "play"}
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                transition={{ duration: 0.2 }}>
                {!isActive && !isRunning ? (
                  <Play className="w-10 h-10 text-white" fill="white" />
                ) : isActive && !isRunning ? (
                  <Play className="w-10 h-10 text-white" fill="white" />
                ) : (
                  <Pause className="w-10 h-10 text-white" fill="white" />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={springConfig}>
        <Button
          variant="outline"
          size="icon"
          className="w-14 h-14 rounded-full border-slate-300 hover:bg-slate-100"
          onClick={handleEnd}
          title="End">
          <Square className="w-7 h-7 text-[#92a2b7]" />
        </Button>
      </motion.div>
    </div>
  );
};
