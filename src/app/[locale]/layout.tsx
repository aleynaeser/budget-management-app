import { Metadata } from 'next';
import { routing } from '@i18n/routing';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { nunitoFont } from '@fonts/nunito-font';
import { NextIntlClientProvider } from 'next-intl';
import { LayoutInitializationProvider, ReactQueryProvider, ReduxProvider } from '@common/providers';
import appConfig from '@root/app.config.json';

import 'swiper/css';
import 'swiper/css/navigation';
import '../../common/sass/style.scss';

interface ILocaleLayout {
  children: React.ReactNode;
  params: { locale: string };
}

export const metadata: Metadata = {
  title: appConfig.title,
};

export default async function LocaleLayout({ children, params }: ILocaleLayout) {
  const { locale } = params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Show a 404 error if the user requests an unknown locale
  const messages = await getMessages();

  return (
    <html lang={params.locale} className={nunitoFont.variable}>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
        <link rel='apple-touch-icon' sizes='180x180' href='/assets/favicons/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/assets/favicons/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/assets/favicons/favicon-16x16.png' />
        <link rel='manifest' href='/assets/favicons/site.webmanifest' />
        <link rel='mask-icon' href='/assets/favicons/safari-pinned-tab.svg' color='#F6F6F6' />
        <link rel='shortcut icon' href='/assets/favicons/favicon.ico' />
        <meta name='msapplication-TileColor' content='#F8F8F8' />
        <meta name='msapplication-config' content='/assets/favicons/browserconfig.xml' />
        <meta name='theme-color' content='#F8F8F8' />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LayoutInitializationProvider>
            <ReactQueryProvider>
              <ReduxProvider>{children}</ReduxProvider>
            </ReactQueryProvider>
          </LayoutInitializationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
