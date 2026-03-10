export default function PhotoWallSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="aspect-3/4 animate-pulse rounded-xl overflow-hidden shadow-md">
          <div className="h-full w-full bg-gray-200 "></div>
        </div>
      ))}
    </div>
  );
}
