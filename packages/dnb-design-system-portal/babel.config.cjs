require('dotenv').config()

module.exports = {
  presets: [
    [
      'babel-preset-gatsby',
      {
        targets: {
          // Should reflect: https://eufemia.dnb.no/uilib/usage#supported-browsers-and-platforms
          browsers: [
            'ie 11',
            'edge >= 14',
            'firefox >= 52',
            'chrome >= 49',
            'safari >= 10',
          ],
        },
      },
    ],
  ],
  // At some point we had to exclude some packages from being processed
  // Looks like it works fine now
  // ignore: [
  //   '.*node_modules/(?!rewrite-pattern|regexpu-core|buble|react-live).*',
  // ],
}
