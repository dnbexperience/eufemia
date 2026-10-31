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
      colorScheme: 'light',
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

describe.each(['ui', 'sbanken', 'eiendom', 'carnegie'])(
  'Plain print styles for %s',
  (themeName) => {
    setupPageScreenshot({
      themeName,
      colorScheme: 'dark',
      url: '/uilib/usage/customisation/styling/document-styles/visual-tests/plain/',
      withWrapper: false,
    })

    it('prints dark content with black text and no backgrounds', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="style-sample"]',
        media: 'print',
      })
    })

    it('restores dark screen colors and hides print-only content', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="style-sample"]',
      })
    })
  }
)
