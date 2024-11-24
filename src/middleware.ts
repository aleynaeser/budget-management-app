import { routing } from './i18n/routing';
import { checkPath } from '@common/helpers';
import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

export default async function middleware(request: NextRequest) {
  const intlResponse = createIntlMiddleware(routing)(request);
  let redirectResponse: NextResponse | undefined = undefined;

  if (checkPath('/', request, true)) {
    redirectResponse = NextResponse.redirect(new URL('/dashboard', request.url));
    return redirectResponse;
  }

  return intlResponse;
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // All requests that have a locale prefix
    '/(tr|en)/:path*',

    // Skip all paths that should not be internationalized
    '/((?!api|_next|.*\\.|\\[...not-found\\]).*)',
  ],
};
