const config = require('./jest.config.js')
module.exports = {
  ...{
    preset: 'jest-playwright-preset',
    testEnvironmentOptions: {
      'jest-playwright': {
        launchOptions: {
          headless: true,
        },
        browsers: [
          // 'chromium',
          // 'webkit',
          'firefox',
        ],
      },
    },
    testRegex: 'screenshot.test.(js|ts|tsx)$',
    testEnvironment: './src/core/jest/jestPuppeteerEnvironment.js',
    setupFilesAfterEnv: ['./src/core/jest/setupJestScreenshot.js'],
    reporters: [
      'default',
      'jest-image-snapshot/src/outdated-snapshot-reporter.js',
      'jest-image-snapshot-reporter',
    ],
    testPathIgnorePatterns: config.testPathIgnorePatterns.filter((i) => {
      return i !== 'screenshot'
    }),
  },
}
