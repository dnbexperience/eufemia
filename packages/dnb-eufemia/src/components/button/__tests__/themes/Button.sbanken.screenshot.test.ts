/**
 * Screenshot Test
 *
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/jest/jestSetupScreenshots'

describe('Button with sbanken theme', () => {
  setupPageScreenshot({
    url: '/uilib/components/button/demos?dnb-theme=sbanken',
  })

  it('have to match "dnb-button--primary"', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-primary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
