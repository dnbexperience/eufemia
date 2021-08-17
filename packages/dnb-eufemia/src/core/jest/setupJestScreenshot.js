/**
 * Jest Setup for Screenshot testing
 *
 */

const { setupJestScreenshot } = require('jest-screenshot')
const { config } = require('./jestSetupScreenshots')

jest.setTimeout(
  config.delayDuringNonheadless > 0
    ? config.delayDuringNonheadless
    : config.timeout > 0
    ? config.timeout
    : 30e3
)

setupJestScreenshot(config.screenshotConfig)
