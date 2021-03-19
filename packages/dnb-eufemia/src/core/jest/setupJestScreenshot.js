/**
 * Jest Setup for Screenshot testing
 *
 */

const { setupJestScreenshot } = require('jest-screenshot')
const { config } = require('./jestSetupScreenshots')

jest.setTimeout(config.timeout > 0 ? config.timeout : 30e3)

setupJestScreenshot(config.screenshotConfig)
