import { NextResponse, type NextRequest } from "next/server"

const locales = ["en", "th"]
const defaultLocale = "en"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Normalize /en/* to clean canonical URLs
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/en/, "") || "/"
    return NextResponse.redirect(url)
  }

  // Locale-prefixed paths (e.g. /th, /th/shop) pass through
  const hasLocalePrefix = locales.some(
    (locale) => locale !== defaultLocale && (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))
  )
  if (hasLocalePrefix) {
    return NextResponse.next()
  }

  // Root: sniff Accept-Language for Thai visitors
  if (pathname === "/") {
    const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? ""
    if (acceptLanguage.includes("th")) {
      const url = request.nextUrl.clone()
      url.pathname = "/th"
      return NextResponse.redirect(url)
    }
  }

  // Everything else: rewrite internally to the default locale
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)+"],
}
