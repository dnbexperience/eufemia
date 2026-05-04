import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Number field for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/extensions/forms/base-fields/Number/demos/',
    })

    test.describe('with step control buttons', () => {
      test('matches the default state', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="number-input-step-controls"] .dnb-forms-field-number',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('matches the hover state', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="number-input-step-controls"] .dnb-forms-field-number',
          simulate: 'hover',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('matches horizontal layout', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="number-horizontal-layout"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('matches status messages', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="number-status"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('matches the focus state', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="number-input-step-controls"] .dnb-forms-field-number',
          simulateSelector:
            '[data-visual-test="number-input-step-controls"] .dnb-input',
          simulate: 'focusclick',
          waitAfterSimulate: 250,
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('matches the disabled state', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="number-input-step-controls-disabled"] .dnb-forms-field-number',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('matches the control button hover state', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="number-input-step-controls"] .dnb-forms-field-number',
          simulateSelector:
            '[data-visual-test="number-input-step-controls"] .dnb-button--control-before',
          simulate: 'hover',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('matches the error state', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="number-input-step-controls-error"] .dnb-forms-field-number',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('matches with label description', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="number-label-description"]',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })
  })
}

test.describe('Field.Number', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/base-fields/Number/demos/',
  })

  test('have to match widths', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-widths"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
