import { NextResponse, type NextRequest } from "next/server"

const locales = ["en", "th"]
const defaultLocale = "en"

function isAdminPath(pathname: string): boolean {
  return (
    pathname.startsWith("/admin") ||
    locales.some((l) => pathname.startsWith(`/${l}/admin`))
  )
}

function isAdminLoginPath(pathname: string): boolean {
  return (
    pathname.startsWith("/admin/login") ||
    locales.some((l) => pathname.startsWith(`/${l}/admin/login`))
  )
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin guard: everything under /admin requires the session cookie,
  // except the login page itself. Fails closed if ADMIN_TOKEN is unset.
  if (isAdminPath(pathname) && !isAdminLoginPath(pathname)) {
    const session = request.cookies.get("admin_session")?.value
    const expected = process.env.ADMIN_TOKEN
    if (!expected || session !== expected) {
      const url = request.nextUrl.clone()
      const localePrefix = locales.find((l) => pathname.startsWith(`/${l}/admin`))
      url.pathname = localePrefix ? `/${localePrefix}/admin/login` : "/admin/login"
      url.search = ""
      return NextResponse.redirect(url)
    }
  }

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
