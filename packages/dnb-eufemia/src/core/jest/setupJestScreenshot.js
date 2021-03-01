/**
 * Jest Setup for Screenshot testing
 *
 */

const isCI = require('is-ci')
const { setupJestScreenshot } = require('jest-screenshot')
const { config } = require('./jestSetupScreenshots')

jest.setTimeout(config.timeout > 0 ? config.timeout : 30e3)

setupJestScreenshot({
  detectAntialiasing: true,
  // local we check for 0% accuracy
  // due to the differences of font rendering between the os (linux/mac/win)
  // we have to have a hight threshold of 8%
  pixelThresholdRelative: isCI ? 0.08 : 0
})
