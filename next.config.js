const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const nextRuntimeDotenv = require('next-runtime-dotenv');
const { nextI18NextRewrites } = require('next-i18next/rewrites');

const withConfig = nextRuntimeDotenv({ public: ['API_URL', 'API_KEY'] });

const localeSubpaths = {};

const nextConfig = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    PROXY_MODE: process.env.PROXY_MODE,
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    STATIC_PATH: process.env.STATIC_PATH,
    localeSubpaths,
  },
};

module.exports = withConfig(
  withPlugins(
    [
      [withCSS],
      [withSass],
      [
        withBundleAnalyzer({
          enabled: process.env.BUNDLE_ANALYZE === 'true',
        }),
      ],
    ],
    nextConfig,
  ),
);
