module.exports = {
  //   multipass: true, // boolean. false by default
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // customize default plugin options
          inlineStyles: {
            onlyMatchedOnce: false,
          },
          //   removeElementsByAttr: {
          //     id,
          //   },
          removeViewBox: false,
          // convertPathData: false, // if we prefer to not transform any data paths, we have to disable this
        },
      },
    },
  ],
}
