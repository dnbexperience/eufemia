/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('VisuallyHidden', () => {
  setupPageScreenshot({ url: '/uilib/components/visually-hidden/demos' })

  it('have to match VisuallyHidden default', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="visually-hidden-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match VisuallyHidden use case', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="visually-hidden-use-case"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match VisuallyHidden element element', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="visually-hidden-element"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match VisuallyHidden focusable', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="visually-hidden-focusable"]',
      simulateSelector:
        '[data-visual-test="visually-hidden-focusable"] .dnb-visually-hidden',
      simulate: 'focus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
