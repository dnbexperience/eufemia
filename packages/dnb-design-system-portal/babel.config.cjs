require('dotenv').config()

module.exports = {
  presets: ['babel-preset-gatsby'],
  // Needed in order to run on IE11
  ignore: [
    '.*node_modules/(?!rewrite-pattern|ansi-regex|strip-ansi|regexpu-core|buble|react-live).*',
  ],
}
