const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  publicPath: "/lab/hangman/",

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/theme.scss";',
      },
    },
  },

  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()],
  },
};
