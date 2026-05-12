import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Form.MainHeading', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Form/MainHeading/demos/',
  })

  test('have to match above stack', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="layout-main-heading-above-stack"]',
    })
  })

  test('have to match above card', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="layout-main-heading-above-card"]',
    })
  })

  test('have to match help button', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="layout-main-heading-help-button"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="layout-main-heading-help-button"] .dnb-help-button',
      recalculateHeightAfterSimulate: true,
    })
  })
})
