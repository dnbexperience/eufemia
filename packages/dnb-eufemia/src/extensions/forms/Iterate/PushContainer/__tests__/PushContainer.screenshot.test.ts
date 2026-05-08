import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

const url = '/uilib/extensions/forms/Iterate/PushContainer/demos/'

test.describe('PushContainer', () => {
  setupPageScreenshot({
    url,
  })

  test('have to match variants', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="push-container-variants"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match variants in error state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="push-container-variants"]',
      simulateSelector:
        '[data-visual-test="push-container-variants"] .dnb-forms-next-button',
      simulate: 'click',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchSnapshot()
  })
})

test.describe('PushContainer on small screen', () => {
  setupPageScreenshot({
    url,
    pageViewport: { width: 640 },
  })

  test('have to match variants', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="push-container-variants"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match variants in error state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="push-container-variants"]',
      simulateSelector:
        '[data-visual-test="push-container-variants"] .dnb-forms-next-button',
      simulate: 'click',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchSnapshot()
  })
})
