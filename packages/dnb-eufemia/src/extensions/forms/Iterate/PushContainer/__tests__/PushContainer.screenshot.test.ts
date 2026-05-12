import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

const url = '/uilib/extensions/forms/Iterate/PushContainer/demos/'

test.describe('PushContainer', () => {
  setupPageScreenshot({
    url,
  })

  test('have to match variants', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="push-container-variants"]',
    })
  })

  test('have to match variants in error state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="push-container-variants"]',
      simulateSelector:
        '[data-visual-test="push-container-variants"] .dnb-forms-next-button',
      simulate: 'click',
      recalculateHeightAfterSimulate: true,
    })
  })
})

test.describe('PushContainer on small screen', () => {
  setupPageScreenshot({
    url,
    pageViewport: { width: 640 },
  })

  test('have to match variants', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="push-container-variants"]',
    })
  })

  test('have to match variants in error state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="push-container-variants"]',
      simulateSelector:
        '[data-visual-test="push-container-variants"] .dnb-forms-next-button',
      simulate: 'click',
      recalculateHeightAfterSimulate: true,
    })
  })
})
