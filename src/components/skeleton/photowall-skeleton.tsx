export default function PhotoWallSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="aspect-3/4 animate-pulse rounded-2xl bg-slate-100"></div>
      ))}
    </div>
  );
}
