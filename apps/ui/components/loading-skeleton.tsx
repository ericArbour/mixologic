export function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex-1 space-y-12 py-1">
        <div className="flex justify-center">
          <div className="h-8 bg-gray-400 rounded w-1/2"></div>
        </div>
        <div className="space-y-8">
          <div className="h-10 bg-gray-400 rounded"></div>
          <div className="h-10 bg-indigo-400 rounded"></div>
        </div>
      </div>
    </div>
  );
}
