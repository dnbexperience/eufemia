/**
 * Jest Setup for Screenshot testing
 *
 */

const { config, setMatchConfig } = require('./jestSetupScreenshots')

jest.retryTimes(config.retryTimes || 0)

jest.setTimeout(
  config.delayDuringNonheadless > 0 &&
    config.delayDuringNonheadless > config.timeout
    ? config.delayDuringNonheadless
    : config.timeout > 0
    ? config.timeout
    : 30e3
)

setMatchConfig(config.matchConfig)
afterEach(() => {
  setMatchConfig(config.matchConfig)
})
