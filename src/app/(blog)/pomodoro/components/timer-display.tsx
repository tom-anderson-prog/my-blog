"use client";

import { useTimerStore } from "@/stores/timer-store";
import { motion } from "framer-motion";
import { PomodoroSettingModal } from "./timer-setting-modal";
import { TimerDigit } from "./timer-digit";
import { useEffect } from "react";

export const TimerDisplay = () => {
  const { timeLeft, isBreak, mode, totalTimeOfStopWatch, isRunning, tick } =
    useTimerStore();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => tick(), 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, tick]);

  const m =
    mode === "pomodoro"
      ? Math.floor(Math.abs(timeLeft) / 60)
          .toString()
          .padStart(2, "0")
      : Math.floor(Math.abs(totalTimeOfStopWatch) / 60)
          .toString()
          .padStart(2, "0");
  const s =
    mode === "pomodoro"
      ? (Math.abs(timeLeft) % 60).toString().padStart(2, "0")
      : (Math.abs(totalTimeOfStopWatch) % 60).toString().padStart(2, "0");

  return (
    <div className="z-10 flex flex-col items-center justify-center pb-20">
      <div className="relative flex items-center justify-center text-[20rem] font-extralight overflow-visible leading-none">
        <div className="flex">
          <TimerDigit value={m[0]} position={0} totalDigits={m.length + 2} />
          <TimerDigit value={m[1]} position={1} totalDigits={m.length + 2} />
          {m.length === 3 && (
            <TimerDigit value={m[2]} position={2} totalDigits={m.length + 2} />
          )}
        </div>
        <span className="w-[0.5ch] text-[#f76934] flex justify-center translate-y-[-0.05rem]">
          :
        </span>
        <div className="flex">
          <TimerDigit
            value={s[0]}
            position={m.length + 1}
            totalDigits={m.length + 2}
          />
          <TimerDigit
            value={s[1]}
            position={m.length + 2}
            totalDigits={m.length + 2}
          />
        </div>
        {!isRunning && (
          <div className="absolute -top-20 right-0 -translate-y-1/2">
            <PomodoroSettingModal />
          </div>
        )}
      </div>

      {mode === "pomodoro" && (
        <p className="absolute bottom-10 text-gray-400 text-sm font-medium tracking-tight uppercase">
          {isBreak ? "Break Time" : "Deep Work Session"}
        </p>
      )}
    </div>
  );
};
