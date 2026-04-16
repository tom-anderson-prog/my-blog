import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FocusMode = "pomodoro" | "stopwatch";

export interface TimerConfig {
  shortBreak: number;
  longBreak: number;
  longBreakAfterNumCycles: number;
  pomodoroDuration: number;
  cycles: number;
  isAutoCycle: boolean;
}

interface TimerState {
  mode: FocusMode;
  isRunning: boolean;
  isActive: boolean;
  isCompleted: boolean;
  startTime: Date | null;
  timeLeft: number;
  totalTimeOfStopWatch: number;

  currentCycle: number;
  isBreak: boolean;
  isLongBreak: boolean;
  config: TimerConfig;

  setMode: (mode: FocusMode) => void;
  resetTimer: () => void;
  start: () => void;
  pause: () => void;
  resume: () => void;
  end: () => void;
  tick: () => void;
  updateConfig: (newConfig: Partial<TimerConfig>) => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      mode: "pomodoro",
      isRunning: false,
      timeLeft: 25 * 60,
      currentCycle: 1,
      startTime: null,
      isBreak: false,
      isLongBreak: false,
      isActive: false,
      isCompleted: false,
      config: {
        shortBreak: 5,
        longBreak: 30,
        longBreakAfterNumCycles: 2,
        pomodoroDuration: 25,
        cycles: 2,
        isAutoCycle: false,
      },
      totalTimeOfStopWatch: 0,
      setMode: (mode) => {
        const { config } = get();
        set({
          mode,
          isActive: false,
          isRunning: false,
          timeLeft: config.pomodoroDuration * 60,
          totalTimeOfStopWatch: 0,
          isCompleted: false,
        });
      },
      start: () => {
        const { config } = get();
        set({
          isActive: true,
          isRunning: true,
          timeLeft: config.pomodoroDuration * 60,
          totalTimeOfStopWatch: 0,
          startTime: new Date(),
          isCompleted: false,
        });
      },
      pause: () => {
        set({
          isRunning: false,
        });
      },
      resume: () => {
        set({
          isRunning: true,
        });
      },
      end: () => {
        const { config } = get();
        set({
          isActive: false,
          isRunning: false,
          isCompleted: true,
          timeLeft: config.pomodoroDuration * 60,
          currentCycle: 1,
          isBreak: false,
          isLongBreak: false,
          totalTimeOfStopWatch: 0,
        });
      },
      resetTimer: () => {
        const { config } = get();
        set({
          isActive: false,
          isRunning: false,
          isCompleted: false,
          timeLeft: config.pomodoroDuration * 60,
          currentCycle: 1,
          isBreak: false,
          isLongBreak: false,
          totalTimeOfStopWatch: 0,
        });
      },
      tick: () => {
        const {
          mode,
          timeLeft,
          totalTimeOfStopWatch,
          isBreak,
          currentCycle,
          config,
        } = get();

        if (mode === "stopwatch") {
          set({
            totalTimeOfStopWatch: totalTimeOfStopWatch + 1,
          });
        }

        if (timeLeft > 0) {
          set({ timeLeft: timeLeft - 1 });
        } else {
          if (!isBreak) {
            const shouldLongBreak =
              currentCycle % config.longBreakAfterNumCycles === 0;
            set({
              isBreak: true,
              isLongBreak: shouldLongBreak,
              timeLeft:
                (shouldLongBreak ? config.longBreak : config.shortBreak) * 60,
            });
          } else {
            if (!config.isAutoCycle) {
              set({
                isActive: false,
                isRunning: false,
                isCompleted: true,
                timeLeft: config.pomodoroDuration * 60,
                currentCycle: 1,
                isBreak: false,
                isLongBreak: false,
                totalTimeOfStopWatch: 0,
              });
            } else {
              if (currentCycle < config.cycles) {
                set({
                  isBreak: false,
                  isLongBreak: false,
                  currentCycle: currentCycle + 1,
                  timeLeft: config.pomodoroDuration * 60,
                });
              } else {
                set({
                  isActive: false,
                  isRunning: false,
                  isCompleted: true,
                  timeLeft: config.pomodoroDuration * 60,
                  currentCycle: 1,
                  isBreak: false,
                  isLongBreak: false,
                  totalTimeOfStopWatch: 0,
                });
              }
            }
          }
        }
      },
      updateConfig: (newConfig) => {
        set((state) => {
          const updated = { ...state.config, ...newConfig };

          return {
            config: updated,
            timeLeft: !state.isRunning
              ? updated.pomodoroDuration * 60
              : state.timeLeft,
          };
        });
      },
    }),
    {
      name: "focus-timer-storage",
    },
  ),
);
