import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken', 'carnegie']) {
  test.describe(`FormStatus for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/form-status/demos/',
    })

    const style = {
      'max-width': '60rem', // make sure our input gets an explicit width, because of mac/linux rendering differences
    }

    test('have to match the form-status with icon', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector: '[data-visual-test="form-status"] .dnb-form-status',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the information state', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector:
          '[data-visual-test="form-status-information"] .dnb-form-status',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match with stretch prop', async () => {
      const screenshot = await makeScreenshot({
        style: {
          'min-width': '60rem',
        },
        selector:
          '[data-visual-test="form-status-stretch"] .dnb-form-status',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the warning state', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector:
          '[data-visual-test="form-status-warning"] .dnb-form-status',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the marketing state', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector:
          '[data-visual-test="form-status-marketing"] .dnb-form-status',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match custom content', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector: '[data-visual-test="form-status-custom"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match icons used in the icon component', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector: '[data-visual-test="form-status-icons"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match all variants', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector: '[data-visual-test="form-status-all-variants"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
