import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

test.describe('Form.MainHeading', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Form/MainHeading/demos/',
  })

  test('have to match above stack', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-main-heading-above-stack"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match above card', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-main-heading-above-card"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match help button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-main-heading-help-button"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="layout-main-heading-help-button"] .dnb-help-button',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchSnapshot()
  })
})
