import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken', 'carnegie']) {
  test.describe(`FormLabel for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/form-label/demos/',
    })

    test('have to match default form-label', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="form-label-default"]',
      })
    })

    test('have to match default form-label with hover', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="form-label-default"]',
        simulate: 'hover',
      })
    })

    test('have to match checkbox label hover', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="form-label-default"]',
        simulate: 'hover',
        simulateSelector:
          '[data-visual-test="form-label-default"] .dnb-checkbox .dnb-form-label',
      })
    })

    test('have to match horizontal form-label', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="form-label-horizontal"]',
      })
    })

    test('have to match fix-content width', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="form-label-default"] label',
        style: {
          'background-color': 'yellow',
        },
        wrapperStyle: {
          display: 'block',
          width: '20rem',
        },
      })
    })
  })
}
