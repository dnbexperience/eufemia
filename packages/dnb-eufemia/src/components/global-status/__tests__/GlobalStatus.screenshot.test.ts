import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

const style = { width: '25rem' }

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`GlobalStatus for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/global-status/demos/',
    })

    test('have to match the default state with custom content', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="global-status"] .dnb-global-status',
      })
    })

    test('have to match the info state and custom content', async () => {
      await makeScreenshot({
        style,
        selector:
          '[data-visual-test="global-status-information"] .dnb-global-status',
      })
    })

    test('have to match the success state and custom content', async () => {
      await makeScreenshot({
        style,
        selector:
          '[data-visual-test="global-status-success"] .dnb-global-status',
      })
    })

    test('have to match the custom icon', async () => {
      await makeScreenshot({
        style,
        selector:
          '[data-visual-test="global-status-icon"] .dnb-global-status',
      })
    })

    if (themeName !== 'sbanken') {
      test('have to match the close button in focus state', async () => {
        await makeScreenshot({
          style,
          selector:
            '[data-visual-test="global-status"] .dnb-global-status',
          simulateSelector:
            '[data-visual-test="global-status"] .dnb-global-status__close-button',
          simulate: 'focus',
        })
      })

      test('have to match the close button in hover state', async () => {
        await makeScreenshot({
          style,
          selector:
            '[data-visual-test="global-status"] .dnb-global-status',
          simulateSelector:
            '[data-visual-test="global-status"] .dnb-global-status__close-button',
          simulate: 'hover',
        })
      })
    }
  })
}
