import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="container-site py-20 text-center">
        <div className="max-w-md mx-auto">
          <span className="text-8xl font-bold text-mainwave-red block mb-2">404</span>
          <h1 className="text-2xl font-bold text-mainwave-black mb-3">Page Not Found</h1>
          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            The page you are looking for does not exist or has been moved.
            Try browsing our shop or contact us for assistance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/shop"
              className="bg-mainwave-red text-white text-sm font-bold uppercase tracking-wider px-6 py-3 hover:bg-red-700 transition-colors"
            >
              Browse Shop
            </Link>
            <Link
              href="/"
              className="bg-mainwave-black text-white text-sm font-bold uppercase tracking-wider px-6 py-3 hover:bg-gray-800 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
