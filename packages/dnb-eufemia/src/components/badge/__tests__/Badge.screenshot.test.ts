import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken', 'carnegie']) {
  test.describe(`Badge for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/badge/demos/',
    })

    test.describe('variant', () => {
      test('have to match variant notification', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-notification"] .dnb-badge',
        })
        expect(screenshot).toMatchSnapshot()
      })
      test('have to match variant notification inline with text', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-notification-inline"]',
        })
        expect(screenshot).toMatchSnapshot()
      })
      test('have to match variant notification for avatar as content', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-notification-avatar"] .dnb-badge__root',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match variant information as default variant', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-default"] .dnb-badge',
        })
        expect(screenshot).toMatchSnapshot()
      })
      test('have to match variant information inline with text', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-information-inline"]',
        })
        expect(screenshot).toMatchSnapshot()
      })
      test('have to match variant information for avatar as content', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-information-avatar"] .dnb-badge__root',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })
    test.describe('positioning', () => {
      test('have to match top left positioning', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '.dnb-badge__root:has([data-visual-test="badge-top-left"])',
        })
        expect(screenshot).toMatchSnapshot()
      })
      test('have to match top right positioning', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '.dnb-badge__root:has([data-visual-test="badge-top-right"])',
        })
        expect(screenshot).toMatchSnapshot()
      })
      test('have to match bottom left positioning', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '.dnb-badge__root:has([data-visual-test="badge-bottom-left"])',
        })
        expect(screenshot).toMatchSnapshot()
      })
      test('have to match bottom right positioning', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '.dnb-badge__root:has([data-visual-test="badge-bottom-right"])',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })
    test.describe('status', () => {
      test('have to match all status variants', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="badge-status"]',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })
  })
}
