// eslint-disable-next-line @typescript-eslint/no-var-requires
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  webpack5: true, // See: https://nextjs.org/docs/messages/future-webpack5-moved-to-webpack5
  webpack: (config, { /* buildId, dev, */ isServer /*, defaultLoaders, webpack */ }) => {
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        }),
      )
    }

    return config
  },
  images: {
    domains: ['a.storyblok.com', 'img2.storyblok.com'],
  },
}
