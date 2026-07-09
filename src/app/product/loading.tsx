export default function ProductLoading() {
  return (
    <div className="container-site py-8">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 w-64 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="aspect-square bg-gray-200" />
          <div>
            <div className="h-6 bg-gray-200 w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 w-32 mb-4" />
            <div className="h-8 bg-gray-200 w-24 mb-4" />
            <div className="h-4 bg-gray-200 w-full mb-2" />
            <div className="h-4 bg-gray-200 w-5/6 mb-6" />
            <div className="h-10 bg-gray-200 w-full mb-2" />
            <div className="h-10 bg-gray-200 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
