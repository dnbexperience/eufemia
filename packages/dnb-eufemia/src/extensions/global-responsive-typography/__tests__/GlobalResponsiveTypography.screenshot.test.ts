import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken', 'carnegie'])(
  `GlobalResponsiveTypography for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/extensions/global-responsive-typography/',
    })

    it('have to match on desktop', async () => {
      await makeScreenshot({
        pageViewport: { width: 1200 },
        selector: '[data-visual-test="global-typography-responsive"]',
      })
    })

    it('have to match on tablet', async () => {
      await makeScreenshot({
        pageViewport: { width: 750 },
        selector: '[data-visual-test="global-typography-responsive"]',
      })
    })

    it('have to match on mobile', async () => {
      await makeScreenshot({
        pageViewport: { width: 400 },
        selector: '[data-visual-test="global-typography-responsive"]',
      })
    })
  }
)
