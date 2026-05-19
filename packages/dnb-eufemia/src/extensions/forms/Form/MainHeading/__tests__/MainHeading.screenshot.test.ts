import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Form.MainHeading', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Form/MainHeading/demos/',
  })

  it('have to match above stack', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="layout-main-heading-above-stack"]',
    })
  })

  it('have to match above card', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="layout-main-heading-above-card"]',
    })
  })

  it('have to match help button', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="layout-main-heading-help-button"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="layout-main-heading-help-button"] .dnb-help-button',
      recalculateHeightAfterSimulate: true,
    })
  })
})
