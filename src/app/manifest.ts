import { MetadataRoute } from 'next';
import appConfig from '../../app.config.json';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: appConfig.title,
    short_name: appConfig.title,
    description: appConfig.description,
    start_url: '/',
    display: 'standalone',
    icons: [
      {
        src: '/assets/favicons/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/favicons/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    background_color: '#F8F8F8',
    theme_color: '#F8F8F8',
  };
}
