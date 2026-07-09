"use client"

import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="container-site py-20 text-center">
        <div className="max-w-md mx-auto">
          <span className="text-8xl font-bold text-mainwave-red block mb-2">!</span>
          <h1 className="text-2xl font-bold text-mainwave-black mb-3">Something Went Wrong</h1>
          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            An unexpected error occurred. Please try again or contact us if the problem persists.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={reset}
              className="bg-mainwave-red text-white text-sm font-bold uppercase tracking-wider px-6 py-3 hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
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
