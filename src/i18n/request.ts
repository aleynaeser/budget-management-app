import { routing } from './routing';
import { getRequestConfig } from 'next-intl/server';

async function importMessages(locale: string) {
  return {
    // ...(await import(`../common/languages/action/${locale}.json`)).default,
  };
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return { locale, messages: await importMessages(locale) };
});
