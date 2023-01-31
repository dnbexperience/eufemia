/**
 * Jest Setup for Screenshot testing
 *
 */

const { configureToMatchImageSnapshot } = require('jest-image-snapshot')
const { config } = require('./jestSetupScreenshots')

jest.retryTimes(config.retryTimes || 0)

jest.setTimeout(
  config.delayDuringNonheadless > 0 &&
    config.delayDuringNonheadless > config.timeout
    ? config.delayDuringNonheadless
    : config.timeout > 0
    ? config.timeout
    : 30e3
)

const toMatchImageSnapshot = configureToMatchImageSnapshot(
  config.matchConfig
)

expect.extend({ toMatchImageSnapshot })
