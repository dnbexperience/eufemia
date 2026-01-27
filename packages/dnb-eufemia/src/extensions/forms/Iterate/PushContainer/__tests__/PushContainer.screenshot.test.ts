/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

const url = '/uilib/extensions/forms/Iterate/PushContainer/demos'

describe('PushContainer', () => {
  setupPageScreenshot({
    url,
  })

  it('should match variants', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="push-container-variants"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match variants in error state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="push-container-variants"]',
      simulateSelector:
        '[data-visual-test="push-container-variants"] .dnb-forms-next-button',
      simulate: 'click',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('PushContainer on small screen', () => {
  setupPageScreenshot({
    url,
    pageViewport: { width: 640 },
  })

  it('should match variants', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="push-container-variants"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match variants in error state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="push-container-variants"]',
      simulateSelector:
        '[data-visual-test="push-container-variants"] .dnb-forms-next-button',
      simulate: 'click',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
