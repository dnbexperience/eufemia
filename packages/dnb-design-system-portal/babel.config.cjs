const isCI = require('is-ci')
const { getCurrentBranchName } = require('./src/uilib/utils/git')

const runModernBuild =
  !isCI ||
  (isCI &&
    !process.env.GATSBY_CLOUD &&
    !process.env.NETLIFY &&
    !/(release|portal|beta|alpha)/.test(getCurrentBranchName()))

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        targets: runModernBuild
          ? {
              chrome: '90', // Like puppeteer v8
            }
          : {
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
    '@babel/preset-react',
  ],
  ignore: [
    '.*node_modules/(?!rewrite-pattern|regexpu-core|buble|react-live).*',
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
}
