import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Checkbox for ${themeName}`, () => {
    test.describe('unchecked', () => {
      setupPageScreenshot({
        themeName,
        url: '/uilib/components/checkbox/demos/',
      })

      test('have to match checkbox in unchecked state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="checkbox-default"] .dnb-checkbox',
        })
      })

      test('have to match checkbox in unchecked state with focus', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="checkbox-default"] .dnb-checkbox',
          simulateSelector:
            '[data-visual-test="checkbox-default"] .dnb-checkbox__input',
          simulate: 'focus', // should be tested first
        })
      })

      test('have to match checkbox in unchecked state with hover', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="checkbox-default"] .dnb-checkbox',
          simulateSelector:
            '[data-visual-test="checkbox-default"] .dnb-checkbox__input',
          simulate: 'hover',
        })
      })

      test('have to match checkbox in unchecked state with error', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="checkbox-error-unchecked"] .dnb-checkbox',
        })
      })

      test('have to match checkbox in unchecked state with error and hover', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="checkbox-error-unchecked"] .dnb-checkbox',
          simulate: 'hover',
        })
      })
    })

    // NB: Because of focus simulation and screenshotElement.press('Tab')
    // we have to run the two focus simulations in a separate run each
    test.describe('checked', () => {
      test('have to match checkbox in checked state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="checkbox-checked"] .dnb-checkbox',
        })
      })

      test('have to match checkbox in checked state with focus', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="checkbox-checked"] .dnb-checkbox',
          simulateSelector:
            '[data-visual-test="checkbox-checked"] .dnb-checkbox__input',
          simulate: 'focus', // should be tested first
        })
      })

      test('have to match checkbox in checked state with hover', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="checkbox-checked"] .dnb-checkbox',
          simulateSelector:
            '[data-visual-test="checkbox-checked"] .dnb-checkbox__input',
          simulate: 'hover',
        })
      })

      test('have to match different checkbox sizes', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="checkbox-sizes"]',
        })
      })

      test('have to match disabled checkbox', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="checkbox-disabled"] .dnb-checkbox',
        })
      })

      test('have to match checkbox in error state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="checkbox-error"] .dnb-checkbox',
        })
      })

      test('have to match checkbox in checked state with error', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="checkbox-error-checked"] .dnb-checkbox',
        })
      })

      test('have to match checkbox in checked state with error and hover', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="checkbox-error-checked"] .dnb-checkbox',
          simulate: 'hover',
        })
      })

      test('have to match checkbox in checked state with larger bounding area', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="checkbox-bounding"] .dnb-checkbox',
        })
      })

      test('have to match checkbox in indeterminate state', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="checkbox-indeterminate"] .dnb-checkbox',
        })
      })
      test('have to match checkbox in indeterminate state with larger bounding area', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="checkbox-indeterminate-large"] .dnb-checkbox',
        })
      })
    })
  })
}
