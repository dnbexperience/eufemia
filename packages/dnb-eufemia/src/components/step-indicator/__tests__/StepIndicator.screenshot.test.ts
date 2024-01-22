/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('StepIndicator', () => {
  setupPageScreenshot({
    pageViewport: {
      width: 1280,
      height: 1024,
    },
    url: '/uilib/components/step-indicator/demos',
  })

  it('have to match loose mode', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="step-indicator-loose"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match loose mode after click simulation', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="step-indicator-loose"]',
      simulateSelector:
        '[data-visual-test="step-indicator-loose"] .dnb-step-indicator__item:nth-of-type(3) button',
      simulate: 'click',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match strict mode', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="step-indicator-strict"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match strict mode after click simulation', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="step-indicator-strict"]',
      simulateSelector:
        '[data-visual-test="step-indicator-strict"] .dnb-step-indicator__item:nth-of-type(1) button',
      simulate: 'click',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match static mode after click simulation', async () => {
    const screenshot = await makeScreenshot({
      selector: 'div#dnb-modal-root',
      simulateSelector:
        '[data-visual-test="step-indicator-static"] .dnb-step-indicator__trigger__button',
      simulate: 'click',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

// eslint-disable-next-line jest/no-identical-title
describe('StepIndicator', () => {
  setupPageScreenshot({
    url: '/uilib/components/step-indicator/demos',
    pageViewport: {
      width: 500,
      height: 600,
    },
  })

  it('have to match loose mode for small screens', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="step-indicator-loose"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match strict mode for small screens', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="step-indicator-strict"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match strict mode for small screens after click simulation', async () => {
    const screenshot = await makeScreenshot({
      selector: 'div#dnb-modal-root',
      simulateSelector:
        '[data-visual-test="step-indicator-strict"] .dnb-step-indicator__trigger__button',
      simulate: 'click',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
