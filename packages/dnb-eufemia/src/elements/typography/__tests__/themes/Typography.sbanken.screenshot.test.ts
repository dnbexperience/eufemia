/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/jest/jestSetupScreenshots'

describe('Typography with sbanken theme', () => {
  setupPageScreenshot({
    url: '/uilib/typography?eufemia-theme=sbanken',
  })

  it('have to match the typography variants', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="typography-variants"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
