/* eslint-disable no-param-reassign */
const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const nextRuntimeDotenv = require('next-runtime-dotenv');
const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');

const withConfig = nextRuntimeDotenv({
  public: ['API_URL', 'API_KEY', 'BASE_URL'],
});

const nextConfig = {
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
  webpack: (config, { dev }) => {
    const splitChunks = config.optimization && config.optimization.splitChunks;
    if (splitChunks) {
      const { cacheGroups } = splitChunks;

      cacheGroups.materialUI = {
        test: /[\\/]node_modules[\\/](@material-ui)[\\/]/,
        name: 'material-ui',
        chunks: 'all',
        enforce: true,
        priority: 60,
      };

      cacheGroups.cssInJS = {
        test: /[\\/]node_modules[\\/](styled-components|@emotion)[\\/]/,
        name: 'css-in-js',
        chunks: 'all',
        enforce: true,
        priority: 60,
      };
    }

    if (!dev) {
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        }),
        new CompressionPlugin({
          filename: '[path][base].br',
          algorithm: 'brotliCompress',
          test: /\.(js|css|html|svg)$/,
          compressionOptions: {
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
            },
          },
          threshold: 10240,
          minRatio: 0.8,
        }),
      );
    }

    return config;
  },
  publicRuntimeConfig: {
    PROXY_MODE: process.env.PROXY_MODE,
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    STATIC_PATH: process.env.STATIC_PATH,
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
