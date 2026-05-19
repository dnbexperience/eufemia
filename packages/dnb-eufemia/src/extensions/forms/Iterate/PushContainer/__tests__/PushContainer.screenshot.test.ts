import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

const url = '/uilib/extensions/forms/Iterate/PushContainer/demos/'

describe('PushContainer', () => {
  setupPageScreenshot({
    url,
  })

  it('have to match variants', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="push-container-variants"]',
    })
  })

  it('have to match variants in error state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="push-container-variants"]',
      simulateSelector:
        '[data-visual-test="push-container-variants"] .dnb-forms-next-button',
      simulate: 'click',
      recalculateHeightAfterSimulate: true,
    })
  })
})

describe('PushContainer on small screen', () => {
  setupPageScreenshot({
    url,
    pageViewport: { width: 640 },
  })

  it('have to match variants', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="push-container-variants"]',
    })
  })

  it('have to match variants in error state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="push-container-variants"]',
      simulateSelector:
        '[data-visual-test="push-container-variants"] .dnb-forms-next-button',
      simulate: 'click',
      recalculateHeightAfterSimulate: true,
    })
  })
})
