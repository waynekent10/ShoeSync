module.exports = {
  reactStrictMode: true,
  // I don't want it to run when compiling as I trust the CI stage of the pipeline and Husky.
  ignoreDuringBuilds: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: 'url-loader',
        options: {
          publicPath: '/_next/', // The URL path where MP3 files will be served from
          name: '[path]shoes.[ext]', // The file name template for MP3 files
        },
      },
    });
    return config;
  },
};
