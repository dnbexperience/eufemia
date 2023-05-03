/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

const themes = [
  ['ui', '/uilib/typography'],
  ['sbanken', '/uilib/typography'],
  ['eiendom', '/uilib/typography'],
]

describe.each(themes)('Typography for %s', (themeName, url) => {
  setupPageScreenshot({
    themeName,
    url,
  })

  it('have to match all the typography variants', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="typography-variants"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
