import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

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
      await makeScreenshot({
        style,
        selector: '[data-visual-test="blockquote-default"]',
      })
    })

    test('have to match "blockquote" with top aligned graphic', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="blockquote-top"]',
      })
    })

    test('have to match "blockquote" with top aligned graphic and no background', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="blockquote-top-no-background"]',
      })
    })

    test('have to match "blockquote" with no background', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="blockquote-no-background"]',
      })
    })

    test('have to match "blockquote" with code as child', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="blockquote-with-code"]',
      })
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
      await makeScreenshot({
        style,
        selector: '[data-visual-test="blockquote-default"]',
      })
    })

    test('have to match "blockquote" with top aligned graphic', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="blockquote-top"]',
      })
    })

    test('have to match "blockquote" with top aligned graphic and no background', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="blockquote-top-no-background"]',
      })
    })

    test('have to match "blockquote" with no background', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="blockquote-no-background"]',
      })
    })
  })
}
