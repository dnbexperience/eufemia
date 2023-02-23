/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../core/jest/jestSetupScreenshots'

describe('Heading', () => {
  setupPageScreenshot({
    url: '/uilib/elements/heading',
  })

  it('have to match the default heading examples', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="heading-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the additional heading examples', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="heading-additional"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
