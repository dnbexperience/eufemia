import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`ToggleButton for ${themeName}`, () => {
    test.describe('ToggleButton unchecked', () => {
      setupPageScreenshot({
        themeName,
        url: '/uilib/components/toggle-button/demos/',
      })

      test('have to match toggle-button in unchecked state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="toggle-button-default"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match toggle-button in unchecked state with focus', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="toggle-button-default"]',
          simulateSelector:
            '[data-visual-test="toggle-button-default"] .dnb-toggle-button__button',
          simulate: 'focus',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match toggle-button in unchecked state with hover', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="toggle-button-default"]',
          simulateSelector:
            '[data-visual-test="toggle-button-default"] .dnb-toggle-button__button',
          simulate: 'hover',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })

    // NB: Because of focus simulation and screenshotElement.press('Tab')
    // we have to run the two focus simulations in a separate run each
    test.describe('checked', () => {
      setupPageScreenshot({
        themeName,
        url: '/uilib/components/toggle-button/demos/',
      })

      test('have to match toggle-button in checked state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="toggle-button-checked"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match toggle-button in checked state with focus', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="toggle-button-checked"]',
          simulateSelector:
            '[data-visual-test="toggle-button-checked"] .dnb-toggle-button__button',
          simulate: 'focus',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match toggle-button in checked state with hover', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="toggle-button-checked"]',
          simulateSelector:
            '[data-visual-test="toggle-button-checked"] .dnb-toggle-button__button',
          simulate: 'hover',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match toggle-button in active focus state', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="toggle-button-checked"]',
          simulateSelector:
            '[data-visual-test="toggle-button-checked"] .dnb-toggle-button__button',
          simulate: 'focusclick',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match toggle-button group', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="toggle-button-group-default"] .dnb-toggle-button-group',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match toggle-button group in vertical layout', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="toggle-button-group-vertical"] .dnb-toggle-button-group',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match toggle-button group with form-status', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="toggle-button-group-status"] .dnb-toggle-button-group',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })

    test('have to match toggle-button in disabled state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="toggle-button-group-disabled"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
