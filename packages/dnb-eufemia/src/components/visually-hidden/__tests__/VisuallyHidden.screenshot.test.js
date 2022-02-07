/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

 import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('VisuallyHidden screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/visually-hidden/demos' })

  it('have to match VisuallyHidden default', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="visually-hidden-default"] .dnb-visually-hidden',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match VisuallyHidden focusable', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="visually-hidden-focusable"] .dnb-visually-hidden',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match VisuallyHidden use case', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="visually-hidden-use-case"] .dnb-visually-hidden',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match VisuallyHidden span element', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="visually-hidden-span"] .dnb-visually-hidden',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})