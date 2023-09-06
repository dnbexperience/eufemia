/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken', 'eiendom'])(
  'Typography for %s',
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/typography',
    })

    it('have to match all the typography variants', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="typography-variants"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
)
describe.each(['sbanken'])('Typography mobile for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/typography',
    pageViewport: {
      width: 400,
    },
  })

  it('have to match all the typography variants', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="typography-variants"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
