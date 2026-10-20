import { describe, it } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken', 'eiendom', 'carnegie'])(
  'Document styles for %s',
  (themeName) => {
    setupPageScreenshot({
      themeName,
      colorScheme: 'light',
      url: '/uilib/usage/customisation/styling/document-styles/visual-tests/document/',
    })

    it('matches document typography and spacing', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="style-sample"]',
      })
    })
  }
)
