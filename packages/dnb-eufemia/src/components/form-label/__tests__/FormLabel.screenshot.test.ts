import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken', 'carnegie']) {
  test.describe(`FormLabel for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/form-label/demos/',
    })

    test('have to match default form-label', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="form-label-default"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match default form-label with hover', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="form-label-default"]',
        simulate: 'hover',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match checkbox label hover', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="form-label-default"]',
        simulate: 'hover',
        simulateSelector:
          '[data-visual-test="form-label-default"] .dnb-checkbox .dnb-form-label',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match horizontal form-label', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="form-label-horizontal"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match fix-content width', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="form-label-default"] label',
        style: {
          'background-color': 'yellow',
        },
        wrapperStyle: {
          display: 'block',
          width: '20rem',
        },
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
