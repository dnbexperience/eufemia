import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

test.describe('Form.SubHeading', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Form/SubHeading/demos/',
  })

  test('have to match above card', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-sub-heading-above-card"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match inside card', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-sub-heading-inside-card"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match below main heading', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-sub-heading-below-main"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match help button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-sub-heading-help-button"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="layout-sub-heading-help-button"] .dnb-help-button',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchSnapshot()
  })
})
