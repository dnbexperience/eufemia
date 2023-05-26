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

    it('have to match the additional all heading 1 variants', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-1-variants"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the additional all heading 2 variants', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-2-variants"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the additional all heading 3 variants', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-3-variants"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the additional all heading 4 variants', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-4-variants"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the additional all heading 5 variants', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-5-variants"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the additional all heading 6 variants', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-6-variants"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
)
