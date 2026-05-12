import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Number field for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/extensions/forms/base-fields/Number/demos/',
    })

    test.describe('with step control buttons', () => {
      test('matches the default state', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="number-input-step-controls"] .dnb-forms-field-number',
        })
      })

      test('matches the hover state', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="number-input-step-controls"] .dnb-forms-field-number',
          simulate: 'hover',
        })
      })

      test('matches horizontal layout', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="number-horizontal-layout"]',
        })
      })

      test('matches status messages', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="number-status"]',
        })
      })

      test('matches the focus state', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="number-input-step-controls"] .dnb-forms-field-number',
          simulateSelector:
            '[data-visual-test="number-input-step-controls"] .dnb-input',
          simulate: 'focusclick',
        })
      })

      test('matches the disabled state', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="number-input-step-controls-disabled"] .dnb-forms-field-number',
        })
      })

      test('matches the control button hover state', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="number-input-step-controls"] .dnb-forms-field-number',
          simulateSelector:
            '[data-visual-test="number-input-step-controls"] .dnb-button--control-before',
          simulate: 'hover',
        })
      })

      test('matches the error state', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="number-input-step-controls-error"] .dnb-forms-field-number',
        })
      })

      test('matches with label description', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="number-label-description"]',
        })
      })
    })
  })
}

test.describe('Field.Number', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/base-fields/Number/demos/',
  })

  test('have to match widths', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-widths"]',
    })
  })
})
