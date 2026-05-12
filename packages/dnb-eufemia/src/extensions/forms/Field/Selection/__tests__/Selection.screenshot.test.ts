import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Selection', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/base-fields/Selection/demos/',
  })

  test.describe('autocomplete', () => {
    test('have to match groups', async () => {
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

  test.describe('dropdown', () => {
    test('have to match dropdown-default', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-dropdown-default"]',
      })
    })

    test('have to match dropdown-horizontal', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-dropdown-horizontal"]',
      })
    })

    test('have to match dropdown-help', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-dropdown-help"]',
      })
    })

    test('have to match dropdown-widths', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-dropdown-widths"]',
      })
    })

    test('have to match dropdown-error-message', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-dropdown-error-message"]',
      })
    })

    test('have to match dropdown-info-message', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-dropdown-info-message"]',
      })
    })

    test('have to match dropdown-warning-message', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="selection-dropdown-warning-message"]',
      })
    })

    test('have to match groups', async () => {
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

  test.describe('radio', () => {
    test('have to match radio-options-vertical', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-radio-options-vertical"]',
      })
    })

    test('have to match radio-options-horizontal', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="selection-radio-options-horizontal"]',
      })
    })

    test('have to match radio-vertical', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-radio-vertical"]',
      })
    })

    test('have to match radio-horizontal', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-radio-horizontal"]',
      })
    })

    test('have to match radio-nesting-logic', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-radio-nesting-logic"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="selection-radio-nesting-logic"] .dnb-radio:nth-of-type(2) input',
        recalculateHeightAfterSimulate: true,
      })
    })

    test('have to match selection-radio-advanced-nesting-logic', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="selection-radio-advanced-nesting-logic"]',
        recalculateHeightAfterSimulate: true,
      })
    })
  })

  test.describe('button', () => {
    test('have to match button-options-vertical', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-button-options-vertical"]',
      })
    })

    test('have to match button-options-horizontal', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="selection-button-options-horizontal"]',
      })
    })

    test('have to match button-vertical', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="selection-button-vertical"]',
      })
    })

    test('have to match button-nesting-logic', async () => {
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
