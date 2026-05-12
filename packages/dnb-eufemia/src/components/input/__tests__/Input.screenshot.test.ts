import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken', 'carnegie'])(
  `Input for %s`,
  (themeName) => {
    const extend = (selector) => ({
      style: {
        width: '200px', // make sure our input gets an explicit width, because of mac/linux rendering differences
      },
      styleSelector: `[data-visual-test="${selector}"] .dnb-input__input`,
      simulateSelector: `[data-visual-test="${selector}"] .dnb-input__input`,
    })
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/input/demos/',
    })

    it('have to match input with placeholder', async () => {
      await makeScreenshot({
        ...extend('input-placeholder'),
        selector: '[data-visual-test="input-placeholder"]',
      })
    })

    it('have to match input with icon', async () => {
      await makeScreenshot({
        ...extend('input-icon'),
        selector: '[data-visual-test="input-icon"]',
      })
    })

    it('have to match disabled input', async () => {
      await makeScreenshot({
        ...extend('input-disabled'),
        selector: '[data-visual-test="input-disabled"]',
      })
    })

    it('have to match search type', async () => {
      await makeScreenshot({
        ...extend('input-search'),
        selector: '[data-visual-test="input-search"]',
      })
    })

    it('have to match search type with hover state', async () => {
      await makeScreenshot({
        ...extend('input-search'),
        selector: '[data-visual-test="input-search"]',
        simulate: 'hover',
      })
    })

    it('have to match search type with button hover state', async () => {
      await makeScreenshot({
        ...extend('input-search'),
        selector: '[data-visual-test="input-search"]',
        simulateSelector: `[data-visual-test="input-search"] .dnb-button`,
        simulate: 'hover',
      })
    })

    it('have to match search type with button active state', async () => {
      await makeScreenshot({
        ...extend('input-search'),
        selector: '[data-visual-test="input-search"]',
        simulateSelector: `[data-visual-test="input-search"] .dnb-button`,
        simulate: 'active',
      })
    })

    it('have to match search type with mouse focus state', async () => {
      await makeScreenshot({
        ...extend('input-search'),
        selector: '[data-visual-test="input-search"]',
        simulate: 'click',
      })
    })

    it('have to match search type with focus state', async () => {
      await makeScreenshot({
        ...extend('input-search'),
        selector: '[data-visual-test="input-search"]',
        simulate: 'focus', // should be tested first
      })
    })

    it('have to match search type with button focus state', async () => {
      await makeScreenshot({
        ...extend('input-search'),
        selector: '[data-visual-test="input-search"]',
        simulateSelector: `[data-visual-test="input-search"] .dnb-button`,
        simulate: 'focus',
      })
    })

    it('have to match stretched and medium size', async () => {
      await makeScreenshot({
        ...{ ...extend('input-medium'), style: { width: '300px' } },
        selector: '[data-visual-test="input-medium"]',
      })
    })

    it('have to match stretched input with status', async () => {
      await makeScreenshot({
        ...{ ...extend('input-stretch'), style: { width: '300px' } },
        selector: '[data-visual-test="input-stretch"]',
      })
    })

    it('have to match error state', async () => {
      await makeScreenshot({
        ...extend('input-error'),
        selector: '[data-visual-test="input-error"]',
      })
    })

    it('have to match error hover state', async () => {
      await makeScreenshot({
        ...extend('input-error'),
        selector: '[data-visual-test="input-error"]',
        simulate: 'hover',
      })
    })

    it('have to match error mouse focus state', async () => {
      await makeScreenshot({
        ...extend('input-error'),
        selector: '[data-visual-test="input-error"]',
        simulate: 'click',
      })
    })

    it('have to match error focus state', async () => {
      await makeScreenshot({
        ...extend('input-error'),
        selector: '[data-visual-test="input-error"]',
        simulate: 'focus',
      })
    })

    it('have to match error with button', async () => {
      await makeScreenshot({
        ...extend('input-error-button'),
        selector: '[data-visual-test="input-error-button"]',
      })
    })

    it('have to match error with button hover', async () => {
      await makeScreenshot({
        ...extend('input-error-button'),
        selector: '[data-visual-test="input-error-button"]',
        simulateSelector: `[data-visual-test="input-error-button"] .dnb-button`,
        simulate: 'hover',
      })
    })

    it('have to match error with button active', async () => {
      await makeScreenshot({
        ...extend('input-error-button'),
        selector: '[data-visual-test="input-error-button"]',
        simulateSelector: `[data-visual-test="input-error-button"] .dnb-button`,
        simulate: 'active',
      })
    })

    it('have to match error with button focus', async () => {
      await makeScreenshot({
        ...extend('input-error-button'),
        selector: '[data-visual-test="input-error-button"]',
        simulateSelector: `[data-visual-test="input-error-button"] .dnb-button`,
        simulate: 'focus',
      })
    })

    it('have to match input with clear button', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="input-clear"]',
      })
    })

    it('have to match input with clear button in hover state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="input-clear"]',
        simulateSelector:
          '[data-visual-test="input-clear"] .dnb-input:nth-of-type(3) .dnb-input__clear-button',
        simulate: 'hover',
      })
    })

    it('have to match text align with icon', async () => {
      await makeScreenshot({
        ...extend('input-align'),
        selector: '[data-visual-test="input-align"]',
      })
    })
  }
)
