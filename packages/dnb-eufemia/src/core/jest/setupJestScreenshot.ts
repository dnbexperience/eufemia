/**
 * Jest Setup for Screenshot testing
 *
 */

import { config, setMatchConfig } from './jestSetupScreenshots'

jest.retryTimes(config.retryTimes || 0)

jest.setTimeout(config.timeout > 0 ? config.timeout : 60e3)

setMatchConfig(config.matchConfig)
afterEach(() => {
  setMatchConfig(config.matchConfig)
})
