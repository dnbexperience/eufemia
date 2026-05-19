import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('VisuallyHidden', () => {
  setupPageScreenshot({ url: '/uilib/components/visually-hidden/demos/' })

  it('have to match VisuallyHidden default', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="visually-hidden-default"]',
    })
  })

  it('have to match VisuallyHidden use case', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="visually-hidden-use-case"]',
    })
  })

  it('have to match VisuallyHidden element element', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="visually-hidden-element"]',
    })
  })

  it('have to match VisuallyHidden focusable', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="visually-hidden-focusable"]',
      simulateSelector:
        '[data-visual-test="visually-hidden-focusable"] .dnb-visually-hidden',
      simulate: 'focus',
    })
  })
})
