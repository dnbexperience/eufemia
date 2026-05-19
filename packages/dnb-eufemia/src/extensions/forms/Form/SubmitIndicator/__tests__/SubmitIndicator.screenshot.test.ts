import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Form.SubmitIndicator', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Form/SubmitIndicator/demos/',
  })

  it('have to match submit-indicator-with-label', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="submit-indicator-with-label"]',
    })
  })
})
