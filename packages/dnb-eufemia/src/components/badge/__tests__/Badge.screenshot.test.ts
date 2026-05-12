import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken', 'carnegie']) {
  test.describe(`Badge for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/badge/demos/',
    })

    test.describe('variant', () => {
      test('have to match variant notification', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-notification"] .dnb-badge',
        })
      })
      test('have to match variant notification inline with text', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-notification-inline"]',
        })
      })
      test('have to match variant notification for avatar as content', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-notification-avatar"] .dnb-badge__root',
        })
      })

      test('have to match variant information as default variant', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-default"] .dnb-badge',
        })
      })
      test('have to match variant information inline with text', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-information-inline"]',
        })
      })
      test('have to match variant information for avatar as content', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-information-avatar"] .dnb-badge__root',
        })
      })
    })
    test.describe('positioning', () => {
      test('have to match top left positioning', async () => {
        await makeScreenshot({
          selector:
            '.dnb-badge__root:has([data-visual-test="badge-top-left"])',
        })
      })
      test('have to match top right positioning', async () => {
        await makeScreenshot({
          selector:
            '.dnb-badge__root:has([data-visual-test="badge-top-right"])',
        })
      })
      test('have to match bottom left positioning', async () => {
        await makeScreenshot({
          selector:
            '.dnb-badge__root:has([data-visual-test="badge-bottom-left"])',
        })
      })
      test('have to match bottom right positioning', async () => {
        await makeScreenshot({
          selector:
            '.dnb-badge__root:has([data-visual-test="badge-bottom-right"])',
        })
      })
    })
    test.describe('status', () => {
      test('have to match all status variants', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="badge-status"]',
        })
      })
    })
  })
}
