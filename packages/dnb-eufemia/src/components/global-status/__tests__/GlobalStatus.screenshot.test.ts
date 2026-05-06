import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

const style = { width: '25rem' }

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`GlobalStatus for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/global-status/demos/',
    })

    test('have to match the default state with custom content', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector: '[data-visual-test="global-status"] .dnb-global-status',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the info state and custom content', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector:
          '[data-visual-test="global-status-information"] .dnb-global-status',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the success state and custom content', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector:
          '[data-visual-test="global-status-success"] .dnb-global-status',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the custom icon', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector:
          '[data-visual-test="global-status-icon"] .dnb-global-status',
      })
      expect(screenshot).toMatchSnapshot()
    })

    if (themeName !== 'sbanken') {
      test('have to match the close button in focus state', async () => {
        const screenshot = await makeScreenshot({
          style,
          selector:
            '[data-visual-test="global-status"] .dnb-global-status',
          simulateSelector:
            '[data-visual-test="global-status"] .dnb-global-status__close-button',
          simulate: 'focus',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match the close button in hover state', async () => {
        const screenshot = await makeScreenshot({
          style,
          selector:
            '[data-visual-test="global-status"] .dnb-global-status',
          simulateSelector:
            '[data-visual-test="global-status"] .dnb-global-status__close-button',
          simulate: 'hover',
        })
        expect(screenshot).toMatchSnapshot()
      })
    }
  })
}
