import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Form.SubmitIndicator', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Form/SubmitIndicator/demos/',
  })

  it('have to match border glow', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="submit-indicator-border-glow"]',
      style: { height: '62rem' },
    })
  })
})
