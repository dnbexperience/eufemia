import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Menu for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/menu/demos/',
    })

    test('have to match menu with accordion item', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="menu-accordion"]',
        style: {
          'padding-bottom': '14rem',
          width: '12rem',
        },
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="menu-accordion"] .dnb-button',
        simulateAfter: { keypress: 'Escape' },
      })

      expect(screenshot).toMatchSnapshot()
    })
  })
}
