import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Radio for ${themeName}`, () => {
    test.describe('unchecked', () => {
      setupPageScreenshot({
        themeName,
        url: '/uilib/components/radio/demos/',
      })

      test('have to match radio in unchecked state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="radio-default"] .dnb-radio',
        })
      })

      test('have to match radio in unchecked state with focus', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="radio-default"] .dnb-radio',
          simulateSelector:
            '[data-visual-test="radio-default"] .dnb-radio__input',
          simulate: 'focus', // should be tested first
        })
      })

      test('have to match radio in unchecked state with hover', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="radio-default"] .dnb-radio',
          simulateSelector:
            '[data-visual-test="radio-default"] .dnb-radio__input',
          simulate: 'hover',
        })
      })

      test('have to match radio in unchecked state with error', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="radio-error-unchecked"] .dnb-radio',
        })
      })

      test('have to match radio in unchecked state with error and hover', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="radio-error-unchecked"] .dnb-radio',
          simulateSelector:
            '[data-visual-test="radio-error-unchecked"] .dnb-radio__input',
          simulate: 'hover',
        })
      })
    })

    // NB: Because of focus simulation and screenshotElement.press('Tab')
    // we have to run the two focus simulations in a separate run each
    test.describe('checked', () => {
      setupPageScreenshot({
        themeName,
        url: '/uilib/components/radio/demos/',
      })

      test('have to match radio in checked state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="radio-checked"] .dnb-radio',
        })
      })

      test('have to match radio in checked state with focus', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="radio-checked"] .dnb-radio',
          simulateSelector:
            '[data-visual-test="radio-checked"] .dnb-radio__input',
          simulate: 'focus', // should be tested first
        })
      })

      test('have to match radio in checked state with hover', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="radio-checked"] .dnb-radio',
          simulateSelector:
            '[data-visual-test="radio-checked"] .dnb-radio__input',
          simulate: 'hover',
        })
      })

      test('have to match disabled group', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="radio-group-disabled"] .dnb-radio-group',
        })
      })

      test('have to match radio group', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="radio-group"] .dnb-radio-group',
        })
      })

      test('have to match radio group in vertical layout', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="radio-group-vertical"] .dnb-radio-group',
        })
      })

      test('have to match radio group with label above', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="radio-group-label-above"] .dnb-radio-group',
        })
      })

      test('have to match radio group with form-status', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="radio-group-status"] .dnb-radio-group',
        })
      })

      test('have to match radio group plain', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="radio-group-plain"]',
        })
      })

      test('have to match radio button in different sizes', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="radio-sizes"]',
        })
      })

      test('have to match radio in checked state with error', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="radio-error-checked"] .dnb-radio',
        })
      })

      test('have to match radio in checked state with error and hover', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="radio-error-checked"] .dnb-radio',
          simulateSelector:
            '[data-visual-test="radio-error-checked"] .dnb-radio__input',
          simulate: 'hover',
        })
      })

      test('have to match radio in checked state with larger bounding area', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="radio-bounding"] .dnb-radio',
        })
      })
    })
  })
}
