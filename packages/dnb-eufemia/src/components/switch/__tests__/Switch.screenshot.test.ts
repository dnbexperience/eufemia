import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Unchecked Switch for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/switch/demos/',
    })

    test('have to match switch in unchecked state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="switch-default"] .dnb-switch',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match switch in unchecked state with focus', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="switch-default"] .dnb-switch',
        simulateSelector:
          '[data-visual-test="switch-default"] .dnb-switch__input',
        simulate: 'focus', // should be tested first
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match switch in unchecked state with hover', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="switch-default"] .dnb-switch',
        simulateSelector:
          '[data-visual-test="switch-default"] .dnb-switch__input',
        simulate: 'hover',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match switch in unchecked state with error', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="switch-error"] .dnb-switch',
        simulate: [
          {
            action: 'click',
            selector:
              '[data-visual-test="switch-error"] .dnb-switch__input',
          },
          {
            action: 'click',
            selector: 'body',
          },
        ],
        waitAfterSimulate: 300,
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}

// NB: Because of focus simulation and screenshotElement.press('Tab')
// we have to run the two focus simulations in a separate run each
for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Checked Switch for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/switch/demos/',
    })

    test('have to match switch in checked state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="switch-checked"] .dnb-switch',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match switch in checked state with focus', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="switch-checked"] .dnb-switch',
        simulateSelector:
          '[data-visual-test="switch-checked"] .dnb-switch__input',
        simulate: 'focus', // should be tested first
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match switch in checked state with hover', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="switch-checked"] .dnb-switch',
        simulateSelector:
          '[data-visual-test="switch-checked"] .dnb-switch__input',
        simulate: 'hover',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match switch in different sizes', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="switch-sizes"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match disabled switch', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="switch-disabled"] .dnb-switch',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match switch in error state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="switch-error"] .dnb-switch',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
