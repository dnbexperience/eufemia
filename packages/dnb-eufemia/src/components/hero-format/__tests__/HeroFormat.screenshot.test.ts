/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('HeroFormat', () => {
  setupPageScreenshot({
    url: '/uilib/components/hero-format/demos/',
  })

  it('have to match default amount', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="hero-format-amount-default"]',
    })

    expect(screenshot).toMatchImageSnapshot()
  })
})
