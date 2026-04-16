"use client";

import { useTimerStore } from "@/stores/timer-store";
import { useEffect, useRef } from "react";

export const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isBreak, isActive, mode } = useTimerStore();
  const prevIsBreak = useRef(isBreak);
  const prevIsActive = useRef(isActive)

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

    if (mode === "pomodoro" && isActive) {
      if(!prevIsActive.current && !isBreak) {
        playSegment(11, 20)
      } else if (isBreak && !prevIsBreak.current) {
        playSegment(0, 10);
      } else if (!isBreak && prevIsBreak.current) {
        playSegment(11, 20);
      }
    }

    prevIsBreak.current = isBreak;
    prevIsActive.current = isActive;
  }, [isActive, isBreak, mode]);

  return null;
};
