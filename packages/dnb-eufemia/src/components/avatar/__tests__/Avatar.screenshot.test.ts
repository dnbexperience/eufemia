import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Avatar for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/avatar/demos/',
    })

    test.describe('children', () => {
      test('have to match icon of variant primary as children', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-children-icon-primary"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match icon of variant secondary as children', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-children-icon-secondary"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match icon of variant tertiary as children', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-children-icon-tertiary"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match logo as children', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-children-logo"]',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })

    test.describe('size', () => {
      test('have to match default size', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-size-default"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match small size', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-size-small"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match medium size', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-size-medium"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match large size', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-size-large"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match x-large size', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-size-x-large"]',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })

    test.describe('variant', () => {
      test('have to match default variant', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-variant-default"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match primary variant', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-variant-primary"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match secondary variant', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-variant-secondary"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match tertiary variant', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-variant-tertiary"]',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })

    test.describe('src', () => {
      test('have to match png image of local src', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-image-local-png"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match svg image of local src', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-image-local-svg"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match image of external src', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-image-external"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match image when passing imgProps', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-image-props"]',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })

    test.describe('grouping', () => {
      test('have to match grouping of small avatars', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-grouped-small"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match grouping of medium avatars', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-grouped-medium"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match grouping of large avatars', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-grouped-large"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match grouping of x-large avatars', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-grouped-x-large"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match grouping of img avatars', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-grouped-image"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match setting custom colors', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-custom-colors"]',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match using country flag as a badge', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="avatar-country-flag-badge"]',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })
  })
}
