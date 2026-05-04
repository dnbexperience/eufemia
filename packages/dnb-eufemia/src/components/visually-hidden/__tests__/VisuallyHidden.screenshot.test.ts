import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('VisuallyHidden', () => {
  setupPageScreenshot({ url: '/uilib/components/visually-hidden/demos/' })

  test('have to match VisuallyHidden default', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="visually-hidden-default"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match VisuallyHidden use case', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="visually-hidden-use-case"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match VisuallyHidden element element', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="visually-hidden-element"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match VisuallyHidden focusable', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="visually-hidden-focusable"]',
      simulateSelector:
        '[data-visual-test="visually-hidden-focusable"] .dnb-visually-hidden',
      simulate: 'focus',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
