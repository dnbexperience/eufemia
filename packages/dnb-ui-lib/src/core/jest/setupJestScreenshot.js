/**
 * Jest Setup for Screenshot testing
 *
 */

const isCI = require('is-ci')
const { setupJestScreenshot } = require('jest-screenshot')

setupJestScreenshot({
  pixelThresholdRelative: isCI ? 0.15 : 0.015
})
