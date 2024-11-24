import { Nunito } from 'next/font/google';

export const nunitoFont = Nunito({
  subsets: ['latin', 'latin-ext'],
  weight: ['200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-nunito',
});
