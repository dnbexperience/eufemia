/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken', 'eiendom'])(
  'Heading for %s',
  (themeName) => {
    setupPageScreenshot({
      themeName,
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
  },
)

describe.each(['ui', 'sbanken', 'eiendom'])(
  'Heading for %s',
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/elements/heading',
    })

    it('matches basic levels', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-basics"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('matches all sizes and variants', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-sizes"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  },
)
