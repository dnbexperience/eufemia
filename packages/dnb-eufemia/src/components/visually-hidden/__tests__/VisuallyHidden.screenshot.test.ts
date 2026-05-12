import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('VisuallyHidden', () => {
  setupPageScreenshot({ url: '/uilib/components/visually-hidden/demos/' })

  test('have to match VisuallyHidden default', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="visually-hidden-default"]',
    })
  })

  test('have to match VisuallyHidden use case', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="visually-hidden-use-case"]',
    })
  })

  test('have to match VisuallyHidden element element', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="visually-hidden-element"]',
    })
  })

  test('have to match VisuallyHidden focusable', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="visually-hidden-focusable"]',
      simulateSelector:
        '[data-visual-test="visually-hidden-focusable"] .dnb-visually-hidden',
      simulate: 'focus',
    })
  })
})
