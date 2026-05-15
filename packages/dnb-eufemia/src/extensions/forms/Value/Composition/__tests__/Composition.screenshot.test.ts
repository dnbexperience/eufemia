import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Value.Composition', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Value/Composition/demos/',
  })

  it('have to match forms-value-composition-default', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-value-composition-default"]',
    })
  })

  it('have to match forms-value-composition-summary-list', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-composition-summary-list"]',
    })
  })

  it('have to match forms-value-composition-summary-list-combined', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-composition-summary-list-combined"]',
    })
  })

  it('have to match forms-value-composition-help', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-value-composition-help"]',
    })
  })

  it('have to match forms-value-composition-wrapping', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-value-composition-wrapping"]',
    })
  })

  it('have to match forms-value-composition-summary-list-grid', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-composition-summary-list-grid"]',
    })
  })

  describe('small', () => {
    setupPageScreenshot({
      url: '/uilib/extensions/forms/Value/Composition/demos/',
      pageViewport: {
        width: 600,
      },
    })

    it('have to match forms-value-composition-summary-list', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-value-composition-summary-list"]',
      })
    })

    it('have to match forms-value-composition-summary-list-grid', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-value-composition-summary-list-grid"]',
      })
    })
  })

  describe('x-small', () => {
    setupPageScreenshot({
      url: '/uilib/extensions/forms/Value/Composition/demos/',
      pageViewport: {
        width: 400,
      },
    })

    it('have to match forms-value-composition-summary-list-grid', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-value-composition-summary-list-grid"]',
      })
    })
  })
})
