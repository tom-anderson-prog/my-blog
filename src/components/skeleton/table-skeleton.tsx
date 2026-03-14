export default function TableSkeleton({
  rows = 5,
  cols = 4,
}: {
  rows?: number;
  cols?: number;
}) {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center space-x-4 pb-2 border-b border-slate-100">
        {Array.from({ length: cols }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-slate-200 rounded animate-pulse flex-1"
          />
        ))}
      </div>

      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className={`h-3 bg-slate-100 rounded animate-pulse flex-1 ${i === cols - 1 ? "max-w-[80px]" : ""}`}
          />
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <div className="h-8 w-48 bg-slate-100 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}
