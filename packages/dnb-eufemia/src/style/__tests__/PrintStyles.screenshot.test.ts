import { describe, it } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken', 'eiendom', 'carnegie'])(
  'Print styles for %s',
  (themeName) => {
    setupPageScreenshot({
      themeName,
      colorScheme: themeName === 'carnegie' ? 'light' : 'dark',
      url: '/uilib/usage/customisation/styling/document-styles/visual-tests/print/',
      withWrapper: false,
    })

    it('matches paper colors and screen-only visibility in print media', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="style-sample"]',
        media: 'print',
      })
    })

    it('restores screen media after a print snapshot', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="style-sample"]',
      })
    })
  }
)
