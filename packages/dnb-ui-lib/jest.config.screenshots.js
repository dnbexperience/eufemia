// because --testPathIgnorePatterns=[array] has a bug, we do handle the ignore screenshots with this config
const config = require('./jest.config.js')
module.exports = {
  ...config,
  ...{
    globalSetup: './src/core/jest/jestPuppeteerSetup.js',
    globalTeardown: './src/core/jest/jestPuppeteerTeardown.js',
    testEnvironment: './src/core/jest/jestPuppeteerEnvironment.js',
    testRegex: 'screenshot.test.js$',
    modulePathIgnorePatterns: config.modulePathIgnorePatterns.filter(i => {
      return i !== 'screenshot'
    })
  }
}
