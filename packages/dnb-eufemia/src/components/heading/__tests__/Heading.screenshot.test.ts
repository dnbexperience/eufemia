import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken', 'eiendom']) {
  test.describe(`Heading for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/heading/demos/',
    })

    test('have to match default headings', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-default"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match headings with context usage', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-context"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match headings with manual mixin', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-mixin"]',
      })
      expect(screenshot).toMatchSnapshot()
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
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-default"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match headings with context usage', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-context"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match headings with manual mixin', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-mixin"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
