import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if pathname already has a locale prefix
  const pathnameLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  if (pathnameLocale) {
    // If it's the default locale in URL, redirect to remove the prefix
    if (pathnameLocale === defaultLocale) {
      const newPathname = pathname.replace(`/${defaultLocale}`, '') || '/'
      return NextResponse.redirect(new URL(newPathname, request.url))
    }
    // Non-default locale — rewrite to include locale for the app
    return NextResponse.next()
  }

  // No locale prefix — rewrite internally to default locale
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!_next|api|favicon|.*\\..*).*)'],
}
