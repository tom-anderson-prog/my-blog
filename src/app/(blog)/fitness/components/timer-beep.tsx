"use client";

import { useEffect, useRef, useCallback } from "react";

interface TimerBeepProps {
  secondsLeft: number;
  isActive: boolean;
  isPaused: boolean;
}

export default function TimerBeep({
  secondsLeft,
  isActive,
  isPaused,
}: TimerBeepProps) {
  const ctxRef = useRef<AudioContext | null>(null);
  const prevSecondsLeft = useRef<number>(secondsLeft);

  // Get or create AudioContext instance
  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      ctxRef.current = new AudioContextClass();
    }
    return ctxRef.current;
  }, []);

  const playTickTock = useCallback(() => {
    const ctx = getCtx();
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // Tick sound (slightly higher pitch, short)
    const tickOsc = ctx.createOscillator();
    const tickGain = ctx.createGain();
    tickOsc.type = "triangle";
    tickOsc.frequency.setValueAtTime(880, now);
    tickGain.gain.setValueAtTime(0, now);
    tickGain.gain.linearRampToValueAtTime(0.35, now + 0.005);
    tickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    tickOsc.connect(tickGain);
    tickGain.connect(ctx.destination);
    tickOsc.start(now);
    tickOsc.stop(now + 0.08);

    // Tock sound (slightly lower pitch, follows immediately)
    setTimeout(() => {
      const tockOsc = ctx.createOscillator();
      const tockGain = ctx.createGain();
      tockOsc.type = "triangle";
      tockOsc.frequency.setValueAtTime(660, now + 0.09);
      tockGain.gain.setValueAtTime(0, now + 0.09);
      tockGain.gain.linearRampToValueAtTime(0.3, now + 0.095);
      tockGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      tockOsc.connect(tockGain);
      tockGain.connect(ctx.destination);
      tockOsc.start(now + 0.09);
      tockOsc.stop(now + 0.18);
    }, 90); // 90ms delay for natural tick-tock rhythm
  }, [getCtx]);

  useEffect(() => {
    if (!isActive || isPaused || secondsLeft <= 0 || secondsLeft > 5) {
      prevSecondsLeft.current = secondsLeft;
      return;
    }

    if (secondsLeft < prevSecondsLeft.current) {
      playTickTock();
    }

    prevSecondsLeft.current = secondsLeft;
  }, [secondsLeft, isActive, isPaused, playTickTock]);

  return null;
}