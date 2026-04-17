"use client";

import { useTimerStore } from "@/stores/timer-store";
import { useEffect, useRef } from "react";

export const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isBreak, mode } = useTimerStore();
  const prevIsBreak = useRef(isBreak);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/clock.wav");
    }

    const playSegment = (start: number, end: number) => {
      const audio = audioRef.current;

      if (!audio) return;

      audio.pause();
      audio.ontimeupdate = null;
      audio.currentTime = start;
      audio.play().catch((err) => console.log("Failed to play audio: ", err));

      const onTimeUpdate = () => {
        if (audio.currentTime >= end) {
          audio.pause();
          audio.removeEventListener("timeupdate", onTimeUpdate);
        }
      };

      audio.addEventListener("timeupdate", onTimeUpdate);
    };

    if (mode === "pomodoro") {
      if (isBreak && !prevIsBreak.current) {
        playSegment(1, 8);
      } else if (!isBreak && prevIsBreak.current) {
        playSegment(11, 20);
      }
    }

    prevIsBreak.current = isBreak;
  }, [isBreak, mode]);

  return null;
};
