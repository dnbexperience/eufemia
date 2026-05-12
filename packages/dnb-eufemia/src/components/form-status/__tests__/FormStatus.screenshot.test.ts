import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

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
      await makeScreenshot({
        style,
        selector: '[data-visual-test="form-status"] .dnb-form-status',
      })
    })

    test('have to match the information state', async () => {
      await makeScreenshot({
        style,
        selector:
          '[data-visual-test="form-status-information"] .dnb-form-status',
      })
    })

    test('have to match with stretch prop', async () => {
      await makeScreenshot({
        style: {
          'min-width': '60rem',
        },
        selector:
          '[data-visual-test="form-status-stretch"] .dnb-form-status',
      })
    })

    test('have to match the warning state', async () => {
      await makeScreenshot({
        style,
        selector:
          '[data-visual-test="form-status-warning"] .dnb-form-status',
      })
    })

    test('have to match the marketing state', async () => {
      await makeScreenshot({
        style,
        selector:
          '[data-visual-test="form-status-marketing"] .dnb-form-status',
      })
    })

    test('have to match custom content', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="form-status-custom"]',
      })
    })

    test('have to match icons used in the icon component', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="form-status-icons"]',
      })
    })

    test('have to match all variants', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="form-status-all-variants"]',
      })
    })
  })
}
