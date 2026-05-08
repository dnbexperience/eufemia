import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

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
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-checkbox-options-vertical"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match checkbox-options-horizontal', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-checkbox-options-horizontal"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match checkbox-horizontal', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-checkbox-horizontal"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match checkbox-horizontal-layout', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-checkbox-horizontal-layout"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match checkbox-help', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="array-selection-checkbox-help"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match checkbox-nesting-logic', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-checkbox-nesting-logic"]',
          simulate: 'click',
          simulateSelector:
            '[data-visual-test="array-selection-checkbox-nesting-logic"] .dnb-checkbox:nth-of-type(2) input',
          recalculateHeightAfterSimulate: true,
        })
        expect(screenshot).toMatchSnapshot()
      })
    })

    test.describe('button', () => {
      test('have to match button-options-vertical', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-button-options-vertical"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match button-options-horizontal', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-button-options-horizontal"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match button-horizontal', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-button-horizontal"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match button-horizontal-layout', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-button-horizontal-layout"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match button-help', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="array-selection-button-help"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match button-nesting-logic', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-button-nesting-logic"]',
          simulate: 'click',
          simulateSelector:
            '[data-visual-test="array-selection-button-nesting-logic"] .dnb-toggle-button:nth-of-type(2) button',
          recalculateHeightAfterSimulate: true,
        })
        expect(screenshot).toMatchSnapshot()
      })
    })

    test.describe('checkbox-button', () => {
      test('have to match simple checkbox-button', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="array-selection-checkbox-button"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match checkbox-button-options-horizontal', async () => {
        const screenshot = await makeScreenshot({
          style: { width: '40rem' },
          selector:
            '[data-visual-test="array-selection-checkbox-button-options-horizontal"]',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })
  })
}
