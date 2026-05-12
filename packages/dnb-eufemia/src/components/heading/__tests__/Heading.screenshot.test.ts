import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken', 'eiendom']) {
  test.describe(`Heading for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/heading/demos/',
    })

    test('have to match default headings', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-default"]',
      })
    })

    test('have to match headings with context usage', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-context"]',
      })
    })

    test('have to match headings with manual mixin', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-mixin"]',
      })
    })
  })
}

for (const themeName of ['sbanken']) {
  test.describe(`Heading mobile for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/heading/demos/',
      pageViewport: {
        width: 400,
      },
    })

    test('have to match default headings', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-default"]',
      })
    })

    test('have to match headings with context usage', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-context"]',
      })
    })

    test('have to match headings with manual mixin', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-mixin"]',
      })
    })
  })
}
