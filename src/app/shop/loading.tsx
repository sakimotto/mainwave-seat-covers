export default function ShopLoading() {
  return (
    <div className="container-site py-12">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 w-48 mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[4/3] bg-gray-200 mb-3" />
              <div className="h-3 bg-gray-200 w-24 mb-2" />
              <div className="h-4 bg-gray-200 w-full mb-1" />
              <div className="h-4 bg-gray-200 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
