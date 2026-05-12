import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Form.SubHeading', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Form/SubHeading/demos/',
  })

  test('have to match above card', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="layout-sub-heading-above-card"]',
    })
  })

  test('have to match inside card', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="layout-sub-heading-inside-card"]',
    })
  })

  test('have to match below main heading', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="layout-sub-heading-below-main"]',
    })
  })

  test('have to match help button', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="layout-sub-heading-help-button"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="layout-sub-heading-help-button"] .dnb-help-button',
      recalculateHeightAfterSimulate: true,
    })
  })
})
