import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`TermDefinition for ${themeName}`, () => {
    setupPageScreenshot({
      url: '/uilib/components/term-definition/demos/',
      themeName,
    })

    test('matches the basic style', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="term-definition-basic"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('matches the popover', async () => {
      const screenshot = await makeScreenshot({
        style: {
          'padding-bottom': '8rem',
        },
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="term-definition-basic"] .dnb-term-definition__trigger',
        selector: '[data-visual-test="term-definition-basic"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('matches various typography styles', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="term-definition-typography"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
