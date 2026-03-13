"use client";

import { useEffect } from "react";
import RoutineSelector from "./routine-selector";
import CurrentExerciseInfo from "./current-exercise-info";
import TimerCircle from "./timer-circle";
import ControlButtons from "./control-button";
import TimerBeep from "./timer-beep";
import FitnessSuccessPage from "./fitness-success";
import { useWorkoutStore } from "@/stores/workoutStore";
import { motion, AnimatePresence } from "framer-motion";

export default function FitnessContentPage() {
  const activeRoutine = useWorkoutStore((state) => state.activeRoutine);
  const currentStepIndex = useWorkoutStore((state) => state.currentStepIndex);
  const secondsLeft = useWorkoutStore((state) => state.secondsLeft);
  const isActive = useWorkoutStore((state) => state.isActive);
  const isPaused = useWorkoutStore((state) => state.isPaused);
  const completed = useWorkoutStore((state) => state.completed);
  console.log({ completed });


  const { start, tick, restart, resume, pause, skip } =
    useWorkoutStore.getState();

  useEffect(() => {
    if (!isActive || isPaused) return;
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isActive, isPaused, tick]);

  const routine = activeRoutine;
  const currentStep = routine?.steps.find(
    (s) => s.order === currentStepIndex + 1,
  );
  const nextStep = routine?.steps.find((s) => s.order === currentStepIndex + 2);

  if (!routine || !currentStep) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-slate-50 to-slate-100">
        <div className="text-xl text-slate-600">init routines...</div>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-white overflow-hidden relative">
      <AnimatePresence mode="wait">
        {!completed ? (
          <motion.div
            key="timer-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onAnimationStart={() => window.scrollTo(0, 0)}
            className="flex flex-col items-center justify-start pt-10 pb-12 px-4 md:px-8">
            <div className="w-full max-w-4xl mb-4">
              <RoutineSelector />
            </div>

            <CurrentExerciseInfo
              type={currentStep?.type}
              name={currentStep?.name}
              nextName={nextStep?.name}
            />

            <TimerCircle
              secondsLeft={secondsLeft}
              duration={currentStep?.duration || 60}
              type={currentStep?.type || "EXERCISE"}
            />

            <ControlButtons
              activeRoutineId={routine.id}
              isPaused={isPaused}
              isActive={isActive}
              onRestart={restart}
              onSkip={skip}
              onTogglePause={
                !isPaused && !isActive
                  ? start
                  : isActive && isPaused
                    ? resume
                    : pause
              }
            />

            <TimerBeep
              secondsLeft={secondsLeft}
              isActive={isActive}
              isPaused={isPaused}
            />
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
            <FitnessSuccessPage
              activeRoutine={activeRoutine}
              onRestart={restart}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
