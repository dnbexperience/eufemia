module.exports = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        /**
         * Customize default plugin options
         */
        overrides: {
          inlineStyles: {
            onlyMatchedOnce: false,
          },
          removeViewBox: false, // to ensure we can scale the svg by font-size later
          // convertPathData: false, // if we prefer to not transform any data paths, we have to disable this
        },
      },
    },
  ],
}
