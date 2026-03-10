export default function LatestArticlesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex-1 animate-pulse">
          <div className="relative aspect-video w-full mb-4 md:mb-6 rounded-xl bg-gray-100"></div>

          <div className="h-6 bg-gray-100 rounded-md mb-2 w-3/4"></div>
          <div className="h-6 bg-gray-100 rounded-md mb-2 w-1/2"></div>

          <div className="space-y-2">
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
