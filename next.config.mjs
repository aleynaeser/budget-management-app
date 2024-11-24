import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              expandProps: 'end',
              typescript: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'addClassesToSVGElement',
                    params: {
                      classNames: ['bm-svg'],
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;
    config.externals = [...config.externals, 'canvas', 'jsdom'];
    return config;
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos', port: '', pathname: '/**' }],
  },

  sassOptions: {
    prependData: `@import '@sass/mixins.scss';`,
  },
};

export default withNextIntl(nextConfig);
