import { WorkoutStep, Routine } from "./../lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WorkoutState {
  routines: Routine[];
  activeRoutineId: number | null;
  activeRoutine: Routine | null;
  currentStepIndex: number;
  secondsLeft: number;
  isActive: boolean;
  isPaused: boolean;

  setRoutines: (routines: Routine[]) => void;
  setActiveRoutine: (id: number) => void;
  start: () => void;
  pause: () => void;
  resume: () => void;
  restart: () => void;
  skip: () => void;
  tick: () => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      routines: [],
      activeRoutineId: null,
      activeRoutine: null,
      currentStepIndex: 0,
      secondsLeft: 60,
      isActive: false,
      isPaused: false,
      setRoutines: (routines) => {
        if (Array.isArray(routines) && routines.length > 0) {
          set({ routines });
        }
      },
      setActiveRoutine: (id: number) => {
        const routine = get().routines.find((r) => r.id === id);
        if (!routine || routine.steps.length === 0) return;

        const first = routine.steps[0];
        set({
          activeRoutineId: id,
          activeRoutine: routine,
          currentStepIndex: 0,
          secondsLeft: first.duration,
          isActive: false,
          isPaused: false,
        });
      },
      start: () => set({ isActive: true, isPaused: false }),
      pause: () => set({ isPaused: true }),
      resume: () => set({ isPaused: false }),
      restart: () => {
        const data = get();
        const routine = data.routines.find(
          (r) => r.id === data.activeRoutineId,
        );
        if (!routine || routine.steps.length === 0) return;

        const first = routine.steps[0];
        set({
          currentStepIndex: 0,
          secondsLeft: first.duration,
          isActive: false,
          isPaused: false,
        });
      },
      skip: () => {
        const data = get();
        const routine = data.routines.find(
          (r) => r.id === data.activeRoutineId,
        );
        if (!routine) return;

        const nextIndex = get().currentStepIndex + 1;
        if (nextIndex >= routine.steps.length) {
          set({ isActive: false, secondsLeft: 0 });
          return;
        }

        const nextStep = routine.steps[nextIndex];
        set({
          currentStepIndex: nextIndex,
          secondsLeft: nextStep.duration,
        });
      },
      tick: () => {
        const s = get();
        if (!s.isActive || s.isPaused || s.secondsLeft <= 0) return;

        if (s.secondsLeft === 1) {
          s.skip();
        } else {
          set({
            secondsLeft: s.secondsLeft - 1,
          });
        }
      },
    }),
    {
      name: "workout-timer-storage",
    },
  ),
);
