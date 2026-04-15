import { ModeTab } from "./components/mode-tab";
import { TimerButtons } from "./components/timer-buttons";
import { TimerDisplay } from "./components/timer-display";

export default function PomodoroPage() {
  return (
    <main className="relative w-full flex flex-col items-center justify-center">
      <div className="absolute top-30 inset-0 flex items-center justify-center z-1 opacity-[0.03] select-none overflow-visible pointer-events-none">
        <span className="text-[20vw] font-black italic tracking-tighter text-gray-900 leading-none">Focus</span>
      </div>

      <div className="mt-20">
        <ModeTab />
      </div>

      <div className="relative mt-20">
        <TimerDisplay />
      </div>

      <TimerButtons />
    </main>
  );
}