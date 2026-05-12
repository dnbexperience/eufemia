import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`TermDefinition for ${themeName}`, () => {
    setupPageScreenshot({
      url: '/uilib/components/term-definition/demos/',
      themeName,
    })

    test('matches the basic style', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="term-definition-basic"]',
      })
    })

    test('matches the popover', async () => {
      await makeScreenshot({
        style: {
          'padding-bottom': '8rem',
        },
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="term-definition-basic"] .dnb-term-definition__trigger',
        selector: '[data-visual-test="term-definition-basic"]',
      })
    })

    test('matches various typography styles', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="term-definition-typography"]',
      })
    })
  })
}
