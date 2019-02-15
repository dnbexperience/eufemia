/**
 * Jest Setup for Screenshot testing
 *
 */

const isCI = require('is-ci')

// we use a replace for now to get this feature of sending the config in here. I made a pull request.
const { setupJestScreenshot } = require('jest-screenshot-replacement')

jest.setTimeout(30e3)

setupJestScreenshot({
  detectAntialiasing: true,
  // local we check for 0.1% accuracy
  // due to the differences of font rendering between the os (linux/mac/win)
  // we have to have a hight threshold of 10%
  pixelThresholdRelative: isCI ? 0.1 : 0.001
})
