"use client";

import { useEffect, useRef } from "react";

interface TimerBeepProps {
  secondsLeft: number;
  isActive: boolean;
  isPaused: boolean;
}

export default function TimeBeep({
  secondsLeft,
  isActive,
  isPaused,
}: TimerBeepProps) {
  const ctxRef = useRef<AudioContext | null>(null);
  const prevSecondsLeft = useRef<number>(secondsLeft);

  useEffect(() => {
    if (!ctxRef.current) {
      ctxRef.current = new window.AudioContext();
    }
  }, []);

  useEffect(() => {
    if (!isActive || isPaused || secondsLeft <= 0 || secondsLeft > 5) return;

    if (secondsLeft < prevSecondsLeft.current) {
      const ctx = ctxRef.current;
      if (ctx) {
        if (ctx.state === "suspended") ctx.resume().catch(console.warn);

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        if (osc && gain) {
          osc.type = "sine";

          if (secondsLeft <= 3) {
            osc.frequency.value = 880 + (3 - secondsLeft) * 120;
            gain.gain.value = 0.65;
            osc.start();
            gain.gain.exponentialRampToValueAtTime(
              0.001,
              ctx.currentTime + 0.12,
            );
            osc.stop(ctx.currentTime + 0.15);
          } else {
            osc.frequency.value = 680;
            gain.gain.value = 0.4;
            osc.start();
            gain.gain.exponentialRampToValueAtTime(
              0.001,
              ctx.currentTime + 0.18,
            );
            osc.stop(ctx.currentTime + 0.2);
          }
        }
      }
    }

    prevSecondsLeft.current = secondsLeft;
  }, [secondsLeft, isActive, isPaused]);

  return null;
}
