/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import { makeScreenshot } from '../../../../../core/jest/jestSetupScreenshots'

describe('Iterate.Array', () => {
  const url = '/uilib/extensions/forms/Iterate/Array/demos'

  it('have to match primitive element values', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="primitive-element-values"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match animated container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector:
        '[data-visual-test="animated-container"] .dnb-forms-section-block',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match filled view container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector:
        '[data-visual-test="filled-view-and-edit-container"] .dnb-forms-section-view-block',
    })

    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match filled edit container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="filled-view-and-edit-container"]',
      screenshotSelector:
        '[data-visual-test="filled-view-and-edit-container"] .dnb-forms-section-edit-block',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="filled-view-and-edit-container"] button',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match view container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector:
        '[data-visual-test="view-and-edit-container"] .dnb-forms-section-view-block',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match edit container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="view-and-edit-container"]',
      screenshotSelector:
        '[data-visual-test="view-and-edit-container"] .dnb-forms-section-edit-block',
      waitAfterSimulate: 100,
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="view-and-edit-container"] button',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
