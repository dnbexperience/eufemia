/**
 * Jest Setup for Screenshot testing
 *
 */

const isCI = require('is-ci')
const { setupJestScreenshot } = require('jest-screenshot')

setupJestScreenshot({
  detectAntialiasing: false,
  pixelThresholdRelative: isCI ? 0.01 : 0.001 // local we check for 0.1% accuracy
})
