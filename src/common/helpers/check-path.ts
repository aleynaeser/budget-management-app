import { NextRequest } from 'next/server';

const checkPathBase = (startsWith: string, pathname: string, locale: string, certain: boolean) => {
  const defaultLocale = 'tr';

  if ((startsWith.length > 0 || locale === defaultLocale) && startsWith[0] !== '/') startsWith = '/' + startsWith;

  if (locale === defaultLocale) {
    return certain ? pathname === startsWith : pathname.startsWith(startsWith);
  }

  const pathWithLocale = '/' + locale + startsWith;

  return certain ? pathname === pathWithLocale : pathname.startsWith(pathWithLocale);
};

export const checkPath = (startsWith: string | string[], request: NextRequest, certain: boolean = false) => {
  const { nextUrl, cookies } = request;
  const locale = cookies.get('NEXT_LOCALE')?.value ?? 'tr';

  if (Array.isArray(startsWith)) {
    return startsWith.some((path) => checkPathBase(path, nextUrl.pathname, locale, certain));
  }

  return checkPathBase(startsWith, nextUrl.pathname, locale, certain);
};
