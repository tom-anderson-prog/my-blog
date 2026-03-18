import { formatTime } from "@/lib/utils";

interface TimerCircleProps {
  secondsLeft: number;
  duration: number;
  type: "EXERCISE" | "REST";
}

export default function TimerCircle({
  secondsLeft,
  duration,
  type = "EXERCISE",
}: TimerCircleProps) {
  const progress = duration > 0 ? secondsLeft / duration : 0;

  const ringColor = type === "REST" ? "#10b981" : "#f97316";
  const label = type === "REST" ? "Rest Remaining" : "Remaining";
  return (
    <div className="relative w-80 h-80 md:w-105 md:h-105">
      <svg className="w-full h-full" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="6"
        />
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={ringColor}
          strokeWidth="6"
          strokeDasharray={565}
          strokeDashoffset={565 * (1 - progress)}
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-7xl md:text-9xl font-black text-slate-800 tabular-nums tracking-tight">
          {formatTime(secondsLeft)}
        </div>
        <div className="text-slate-500 mt-3 text-xl">{label}</div>
      </div>
    </div>
  );
}
