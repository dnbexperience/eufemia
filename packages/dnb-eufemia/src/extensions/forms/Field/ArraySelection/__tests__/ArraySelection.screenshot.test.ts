import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`ArraySelection field for ${themeName}`, () => {
    setupPageScreenshot({
      pageViewport: {
        width: 800,
      },
      themeName,
      url: '/uilib/extensions/forms/base-fields/ArraySelection/demos/',
    })

    test.describe('checkbox', () => {
      test('have to match checkbox-options-vertical', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-checkbox-options-vertical"]',
        })
      })

      test('have to match checkbox-options-horizontal', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-checkbox-options-horizontal"]',
        })
      })

      test('have to match checkbox-horizontal', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-checkbox-horizontal"]',
        })
      })

      test('have to match checkbox-horizontal-layout', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-checkbox-horizontal-layout"]',
        })
      })

      test('have to match checkbox-help', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="array-selection-checkbox-help"]',
        })
      })

      test('have to match checkbox-nesting-logic', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-checkbox-nesting-logic"]',
          simulate: 'click',
          simulateSelector:
            '[data-visual-test="array-selection-checkbox-nesting-logic"] .dnb-checkbox:nth-of-type(2) input',
          recalculateHeightAfterSimulate: true,
        })
      })
    })

    test.describe('button', () => {
      test('have to match button-options-vertical', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-button-options-vertical"]',
        })
      })

      test('have to match button-options-horizontal', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-button-options-horizontal"]',
        })
      })

      test('have to match button-horizontal', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-button-horizontal"]',
        })
      })

      test('have to match button-horizontal-layout', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-button-horizontal-layout"]',
        })
      })

      test('have to match button-help', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="array-selection-button-help"]',
        })
      })

      test('have to match button-nesting-logic', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-button-nesting-logic"]',
          simulate: 'click',
          simulateSelector:
            '[data-visual-test="array-selection-button-nesting-logic"] .dnb-toggle-button:nth-of-type(2) button',
          recalculateHeightAfterSimulate: true,
        })
      })
    })

    test.describe('checkbox-button', () => {
      test('have to match simple checkbox-button', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="array-selection-checkbox-button"]',
        })
      })

      test('have to match checkbox-button-options-horizontal', async () => {
        await makeScreenshot({
          style: { width: '40rem' },
          selector:
            '[data-visual-test="array-selection-checkbox-button-options-horizontal"]',
        })
      })
    })
  })
}
