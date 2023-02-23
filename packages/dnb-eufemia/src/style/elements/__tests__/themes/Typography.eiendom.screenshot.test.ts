/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/jest/jestSetupScreenshots'

describe('Typography with eiendom theme', () => {
  setupPageScreenshot({
    url: '/uilib/typography?dnb-theme=eiendom',
  })

  it('have to match the typography variants', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="typography-variants"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
