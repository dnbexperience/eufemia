import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Currency field for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/extensions/forms/feature-fields/Currency/demos/',
  })

  describe('with step control buttons', () => {
    it('matches the default state', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="currency-input-step-controls"] .dnb-forms-field-number',
      })
    })
  })
})
