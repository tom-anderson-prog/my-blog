"use client";

import { useSession } from "@/lib/auth-client";
import type { FocusMode, TimerConfig } from "@/stores/timer-store";
import { intervalToDuration } from "date-fns";
import { motion, type Variants } from "framer-motion";
import { Play } from "lucide-react";
import { TimerFeelForm } from "./timer-feel-form";

export default function TimerSuccessPage({
  onRestart,
  config,
  startTime,
  mode,
  totalTimeOfStopWatch,
}: {
  onRestart: () => void;
  config: TimerConfig;
  startTime: Date;
  mode: FocusMode;
  totalTimeOfStopWatch: number;
}) {
  const { data: session } = useSession();
  let m = "";
  let s = "";

  if (mode === "stopwatch") {
    const duration = intervalToDuration({
      start: 0,
      end: totalTimeOfStopWatch * 1000,
    });
    m = String(duration.minutes ?? 0).padStart(2, "0");
    s = String(duration.seconds ?? 0).padStart(2, "0");
  } else {
    const now = new Date();

    const startMs = !startTime ? now.getTime() : startTime?.getTime();
    const duration1 = now.getTime() - startMs;

    const duration2 = config.pomodoroDuration * 60 * config.cycles * 1000;
    const duration = intervalToDuration({
      start: 0,
      end: Math.min(duration1, duration2),
    });
    m = String(duration.minutes ?? 0).padStart(2, "0");
    s = String(duration.seconds ?? 0).padStart(2, "0");
  }

  const containerVars: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVars: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      variants={containerVars}
      initial="initial"
      animate="animate"
      className="w-full flex flex-col justify-start items-center pt-10 px-4 md:px-8 max-w-4xl mx-auto">
      <motion.h1
        variants={itemVars}
        className="text-6xl md:text-9xl bg-clip-text text-transparent bg-linear-to-r from-[#FF6B35] to-[#FF2B81] mb-6 md:mb-3 tracking-tight">
        Well Done!
      </motion.h1>
      <motion.p
        variants={itemVars}
        className="text-xl text-slate-300 text-center italic mb-8">
        You&apos;ve completed your focus session.
      </motion.p>

      {session ? (
        <TimerFeelForm />
      ) : (
        <>
          <motion.div variants={itemVars} className="w-full mb-16">
            <div className="flex flex-col justify-center items-center">
              <div className="text-lg text-slate-200 tracking-widest">
                Focus Total Time
              </div>
              <div className="text-[22vw] sm:text-[23vw] md:text-[16vw] lg:text-[12vw]  font-light">
                {m}:{s}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVars}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <button
              type="button"
              onClick={onRestart}
              className="group px-10 py-4 rounded-2xl bg-linear-to-r from-[#FF6B35] to-[#FF2B81] hover:scale-110 active:scale-90 text-white cursor-pointer text-lg font-bold shadow-lg shadow-orange-200 transition-all mb-4 flex justify-center items-center gap-1">
              <Play className="w-2 h-2 fill-current" />
              START AGAIN
            </button>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
