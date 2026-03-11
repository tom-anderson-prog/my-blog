"use client";

import { useEffect } from "react";
import RoutineSelector from "./routine-selector";
import CurrentExerciseInfo from "./current-exercise-info";
import TimerCircle from "./timer-circle";
import ControlButtons from "./control-button";
import TimerBeep from "./timer-beep";
import { useWorkoutStore } from "@/stores/workoutStore";

export default function FitnessContentPage() {
  const activeRoutine = useWorkoutStore((state) => state.activeRoutine);
  const currentStepIndex = useWorkoutStore((state) => state.currentStepIndex);
  const secondsLeft = useWorkoutStore((state) => state.secondsLeft);
  const isActive = useWorkoutStore((state) => state.isActive);
  const isPaused = useWorkoutStore((state) => state.isPaused);

  const { tick, restart, resume, pause, skip } = useWorkoutStore.getState();

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
        <div className="text-xl text-slate-600">正在初始化训练计划...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-start pt-10 pb-24 px-4 md:px-8">
      <div className="w-full max-w-4xl mb-8">
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
        onRestart={restart}
        onSkip={skip}
        onTogglePause={isPaused ? resume : pause}
      />

      <TimerBeep
        secondsLeft={secondsLeft}
        isActive={isActive}
        isPaused={isPaused}
      />
    </div>
  );
}
