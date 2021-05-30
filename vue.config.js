module.exports = {
  publicPath: "/lab/hangman/",

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/theme.scss";',
      },
    },
  },
};
