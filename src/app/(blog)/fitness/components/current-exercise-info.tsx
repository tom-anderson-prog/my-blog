interface CurrentExerciseInfoProps {
  type?: "EXERCISE" | "REST";
  name?: string;
  nextName?: string;
}

export default function CurrentExerciseInfo({
  type,
  name,
  nextName,
}: CurrentExerciseInfoProps) {
  const isRest = type === "REST";

  return (
    <div className="w-full max-w-2xl text-center mb-4 px-4">
      <div className="inline-flex items-center gap-2 bg-[#fff7ed] text-[#ec5b13] px-5 py-1.5 rounded-full text-sm font-medium mb-2 shadow-sm">
        <span className="w-2.5 h-2.5 rounded-full bg-[#fc7836] animate-pulse"></span>
        Current Exercise
      </div>

      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-800 leading-tight mb-2">
        {name}
      </h1>

      {nextName && (
        <div className="text-slate-500 text-sm md:text-md">
          NEXT UP:{" "}
          <span className="font-medium text-slate-700">{nextName}</span> →
        </div>
      )}
    </div>
  );
}
