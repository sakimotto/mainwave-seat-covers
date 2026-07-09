export default function VehicleLoading() {
  return (
    <div className="container-site py-12">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 w-48 mb-8" />
        <div className="h-32 bg-gray-200 w-full max-w-xl mx-auto mb-12" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-200 p-6">
              <div className="w-12 h-12 bg-gray-300 mx-auto mb-2 rounded-full" />
              <div className="h-4 bg-gray-300 w-20 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
