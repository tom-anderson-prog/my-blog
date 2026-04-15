"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTimerStore } from "@/stores/timer-store";
import { ModeTab } from "./mode-tab";
import { TimerDisplay } from "./timer-display";
import { TimerButtons } from "./timer-buttons";
import TimerSuccessPage from "./timer-success";
import { Suspense } from "react";

export default function TimerContentPage() {
  const isCompleted = useTimerStore((state) => state.isCompleted);
  const config = useTimerStore((state) => state.config);
  const startTime = useTimerStore((state) => state.startTime);
  const mode = useTimerStore((state) => state.mode);
  const totalTimeOfStopWatch = useTimerStore((state) => state.totalTimeOfStopWatch);

  const { resetTimer } = useTimerStore();

  return (
    <main className="bg-white overflow-visible relative">
      <AnimatePresence mode="wait">
        {!isCompleted ? (
          <motion.div
            key="timer-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onAnimationStart={() => window.scrollTo(0, 0)}
            className="relative w-full flex flex-col items-center justify-center">
            <div className="absolute top-30 inset-0 flex items-center justify-center z-1 opacity-[0.03] select-none overflow-visible pointer-events-none">
              <span className="text-[20vw] font-black italic tracking-tighter text-gray-900 leading-none">
                Focus
              </span>
            </div>
            <div className="mt-20">
              <ModeTab />
            </div>
            <div className="relative mt-20">
              <TimerDisplay />
            </div>
            <TimerButtons />
          </motion.div>
        ) : (
          <motion.div
            key="success-view"
            initial={{ opacity: 0, y: 40, scale: 1.05 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 79,
              damping: 15,
              delay: 0.2,
            }}
            onAnimationStart={() => window.scrollTo(0, 0)}
            className="w-full">
            <Suspense>
              <TimerSuccessPage onRestart={resetTimer} config={config} startTime={startTime!} mode={mode} totalTimeOfStopWatch={totalTimeOfStopWatch} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
