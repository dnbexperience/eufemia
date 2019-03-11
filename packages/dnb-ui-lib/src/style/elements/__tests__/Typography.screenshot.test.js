/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

// NB: Remember that the fonts are swapped out with arial during the tests

describe('Heading screenshot', () => {
  setupPageScreenshot({ url: '/uilib/typography' })
  it('have to match the additional heading examples', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="heading-additional"] article'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the paragraph example', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="paragraph-example"] .dnb-p'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
