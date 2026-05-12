import { it, describe } from 'vitest'
import { makeScreenshot } from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Iterate.Array', () => {
  const url = '/uilib/extensions/forms/Iterate/Array/demos/'

  it('have to match primitive element values', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="primitive-element-values"]',
    })
  })

  it('have to match animated container', async () => {
    await makeScreenshot({
      url,
      selector:
        '[data-visual-test="animated-container"] .dnb-forms-section-block',
    })
  })

  it('have to match filled view container', async () => {
    await makeScreenshot({
      url,
      selector:
        '[data-visual-test="filled-view-and-edit-container"] .dnb-forms-section-view-block',
    })
  })

  it('have to match view container with line divider', async () => {
    await makeScreenshot({
      url,
      selector:
        '[data-visual-test="view-and-edit-container-with-line-divider"]',
    })
  })

  it('have to match filled edit container', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="filled-view-and-edit-container"]',
      screenshotSelector:
        '[data-visual-test="filled-view-and-edit-container"] .dnb-forms-section-edit-block',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="filled-view-and-edit-container"] button',
      recalculateHeightAfterSimulate: true,
    })
  })

  it('have to match view container', async () => {
    await makeScreenshot({
      url,
      selector:
        '[data-visual-test="view-and-edit-container"] .dnb-forms-section-view-block',
    })
  })

  it('have to match edit container', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="view-and-edit-container"]',
      screenshotSelector:
        '[data-visual-test="view-and-edit-container"] .dnb-forms-section-edit-block',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="view-and-edit-container"] button',
      recalculateHeightAfterSimulate: true,
    })
  })
})
