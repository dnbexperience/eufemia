import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Blockquote for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/elements/blockquote/demos/',
    })

    const style = {
      width: '30rem', // make sure our input gets an explicit width, because of mac/linux rendering differences
    }

    test('have to match default "blockquote"', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector: '[data-visual-test="blockquote-default"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match "blockquote" with top aligned graphic', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector: '[data-visual-test="blockquote-top"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match "blockquote" with top aligned graphic and no background', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector: '[data-visual-test="blockquote-top-no-background"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match "blockquote" with no background', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector: '[data-visual-test="blockquote-no-background"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match "blockquote" with code as child', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector: '[data-visual-test="blockquote-with-code"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}

for (const themeName of ['sbanken']) {
  test.describe(`Blockquote on mobile for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/elements/blockquote/demos/',
      pageViewport: { width: 640 },
    })

    const style = {
      width: '30rem', // make sure our input gets an explicit width, because of mac/linux rendering differences
    }

    test('have to match default "blockquote"', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector: '[data-visual-test="blockquote-default"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match "blockquote" with top aligned graphic', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector: '[data-visual-test="blockquote-top"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match "blockquote" with top aligned graphic and no background', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector: '[data-visual-test="blockquote-top-no-background"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match "blockquote" with no background', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector: '[data-visual-test="blockquote-no-background"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
