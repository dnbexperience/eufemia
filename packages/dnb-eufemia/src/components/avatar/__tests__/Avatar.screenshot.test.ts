import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Avatar for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/avatar/demos/',
    })

    test.describe('children', () => {
      test('have to match icon of variant primary as children', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-children-icon-primary"]',
        })
      })

      test('have to match icon of variant secondary as children', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-children-icon-secondary"]',
        })
      })

      test('have to match icon of variant tertiary as children', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-children-icon-tertiary"]',
        })
      })

      test('have to match logo as children', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-children-logo"]',
        })
      })
    })

    test.describe('size', () => {
      test('have to match default size', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-size-default"]',
        })
      })

      test('have to match small size', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-size-small"]',
        })
      })

      test('have to match medium size', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-size-medium"]',
        })
      })

      test('have to match large size', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-size-large"]',
        })
      })

      test('have to match x-large size', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-size-x-large"]',
        })
      })
    })

    test.describe('variant', () => {
      test('have to match default variant', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-variant-default"]',
        })
      })

      test('have to match primary variant', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-variant-primary"]',
        })
      })

      test('have to match secondary variant', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-variant-secondary"]',
        })
      })

      test('have to match tertiary variant', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-variant-tertiary"]',
        })
      })
    })

    test.describe('src', () => {
      test('have to match png image of local src', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-image-local-png"]',
        })
      })

      test('have to match svg image of local src', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-image-local-svg"]',
        })
      })

      test('have to match image of external src', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-image-external"]',
        })
      })

      test('have to match image when passing imgProps', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-image-props"]',
        })
      })
    })

    test.describe('grouping', () => {
      test('have to match grouping of small avatars', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-grouped-small"]',
        })
      })

      test('have to match grouping of medium avatars', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-grouped-medium"]',
        })
      })

      test('have to match grouping of large avatars', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-grouped-large"]',
        })
      })

      test('have to match grouping of x-large avatars', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-grouped-x-large"]',
        })
      })

      test('have to match grouping of img avatars', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-grouped-image"]',
        })
      })

      test('have to match setting custom colors', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-custom-colors"]',
        })
      })

      test('have to match using country flag as a badge', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="avatar-country-flag-badge"]',
        })
      })
    })
  })
}
