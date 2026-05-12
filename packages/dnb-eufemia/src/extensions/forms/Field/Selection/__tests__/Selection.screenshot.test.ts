import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Selection', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/base-fields/Selection/demos/',
  })

  describe('autocomplete', () => {
    it('have to match groups', async () => {
      await makeScreenshot({
        style: {
          height: '16rem',
        },
        selector: '[data-visual-test="selection-autocomplete-groups"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="selection-autocomplete-groups"] .dnb-autocomplete .dnb-input__input',
        simulateAfter: { keypress: 'Escape' },
      })
    })
  })

  describe('dropdown', () => {
    it('have to match dropdown-default', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-dropdown-default"]',
      })
    })

    it('have to match dropdown-horizontal', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-dropdown-horizontal"]',
      })
    })

    it('have to match dropdown-help', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-dropdown-help"]',
      })
    })

    it('have to match dropdown-widths', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-dropdown-widths"]',
      })
    })

    it('have to match dropdown-error-message', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-dropdown-error-message"]',
      })
    })

    it('have to match dropdown-info-message', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-dropdown-info-message"]',
      })
    })

    it('have to match dropdown-warning-message', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="selection-dropdown-warning-message"]',
      })
    })

    it('have to match groups', async () => {
      await makeScreenshot({
        style: {
          height: '16rem',
        },
        selector: '[data-visual-test="selection-dropdown-groups"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="selection-dropdown-groups"] .dnb-dropdown__trigger',
        simulateAfter: { keypress: 'Escape' },
      })
    })
  })

  describe('radio', () => {
    it('have to match radio-options-vertical', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-radio-options-vertical"]',
      })
    })

    it('have to match radio-options-horizontal', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="selection-radio-options-horizontal"]',
      })
    })

    it('have to match radio-vertical', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-radio-vertical"]',
      })
    })

    it('have to match radio-horizontal', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-radio-horizontal"]',
      })
    })

    it('have to match radio-nesting-logic', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-radio-nesting-logic"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="selection-radio-nesting-logic"] .dnb-radio:nth-of-type(2) input',
        recalculateHeightAfterSimulate: true,
      })
    })

    it('have to match selection-radio-advanced-nesting-logic', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="selection-radio-advanced-nesting-logic"]',
        recalculateHeightAfterSimulate: true,
      })
    })
  })

  describe('button', () => {
    it('have to match button-options-vertical', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-button-options-vertical"]',
      })
    })

    it('have to match button-options-horizontal', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="selection-button-options-horizontal"]',
      })
    })

    it('have to match button-vertical', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-button-vertical"]',
      })
    })

    it('have to match button-nesting-logic', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-button-nesting-logic"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="selection-button-nesting-logic"] .dnb-toggle-button:nth-of-type(2) button',
        recalculateHeightAfterSimulate: true,
      })
    })
  })
})
