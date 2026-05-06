export default function DashboardLoading() {
  return (
    <div className="flex-1 flex flex-col min-h-0 animate-pulse">
      {/* Header skeleton */}
      <div className="h-14 border-b border-gray-200 bg-white flex items-center px-6 gap-4 sticky top-0 z-10">
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </div>
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-white border border-gray-200 rounded-xl" />
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="h-64 bg-white border border-gray-200 rounded-xl" />
          <div className="h-64 bg-white border border-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
