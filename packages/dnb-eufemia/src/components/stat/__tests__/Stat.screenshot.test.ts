/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Stat', () => {
  setupPageScreenshot({
    url: '/uilib/components/stat/demos/',
  })

  it('have to match default amount', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="stat-amount-default"]',
    })

    expect(screenshot).toMatchImageSnapshot()
  })
})
