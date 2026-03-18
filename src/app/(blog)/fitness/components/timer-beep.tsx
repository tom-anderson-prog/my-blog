"use client";

import { useEffect, useRef, useCallback } from "react";

interface TimerBeepProps {
  secondsLeft: number;
  isActive: boolean;
  isPaused: boolean;
  currentStepName?: string;
}

export default function TimerBeep({
  secondsLeft,
  isActive,
  isPaused,
  currentStepName,
}: TimerBeepProps) {
  const prevSecondsRef = useRef<number>(secondsLeft);
  const currentStepNameRef = useRef<string | undefined>(undefined);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // 1. Web Audio API Engine - Generates crisp, zero-latency beeps
  const playSound = useCallback(
    (frequency: number, type: OscillatorType = "sine", duration = 0.1) => {
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (
            window.AudioContext || (window as any).webkitAudioContext
          )();
        }

        const ctx = audioCtxRef.current;
        if (ctx.state === "suspended") ctx.resume();

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

        // Volume envelope: start at 0.2, fade to 0 quickly to avoid clicking sound
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          ctx.currentTime + duration,
        );

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start();
        oscillator.stop(ctx.currentTime + duration);
      } catch (error) {
        console.warn("Audio playback failed:", error);
      }
    },
    [],
  );

  // 2. TTS for Step Names only
  const speakName = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    if (!isActive || isPaused) return;

    // --- A. New Step Announcement ---
    if (currentStepName !== currentStepNameRef.current) {
      currentStepNameRef.current = currentStepName;
      if (currentStepName) {
        speakName(currentStepName);
      }
    }

    // --- B. Motivational Beeps (Final 3 seconds) ---
    if (secondsLeft < prevSecondsRef.current) {
      // Final 3, 2, 1 (Standard Tick)
      if (secondsLeft <= 3 && secondsLeft > 0) {
        playSound(880, "sine", 0.1); // High pitch A5
      }
      // GO! / Switch mark (Energetic Ding)
      else if (secondsLeft === 0) {
        playSound(1320, "triangle", 0.3); // Even higher E6, richer texture
      }
    }

    prevSecondsRef.current = secondsLeft;
  }, [secondsLeft, isActive, isPaused, currentStepName, playSound, speakName]);

  // Global Cleanup
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return null;
}