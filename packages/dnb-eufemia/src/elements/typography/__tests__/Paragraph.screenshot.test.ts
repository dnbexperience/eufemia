import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Paragraph', () => {
  setupPageScreenshot({
    url: '/uilib/elements/paragraph/demos/',
  })

  test('matches prose max width', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="paragraph-prose-max-width"]',
    })
  })
})

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Paragraph for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/elements/paragraph/demos/',
    })

    test('have to match the paragraph with weight modifiers', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="paragraph-modifiers-weight"]',
      })
    })

    test('have to match the paragraph with size modifiers', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="paragraph-modifiers-size"]',
      })
    })

    test('have to match the paragraph with align modifiers', async () => {
      await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="paragraph-modifiers-align"]',
      })
    })

    test('have to match the paragraph with family modifiers', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="paragraph-modifiers-family"]',
      })
    })

    test('have to match the paragraph with line modifiers', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="paragraph-modifiers-line"]',
      })
    })

    test('have to match the paragraph with other modifiers', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="paragraph-modifiers-other"]',
      })
    })

    test('have to match the paragraph example', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="paragraph-default"]',
      })
    })

    test('have to match the paragraph with small text', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="paragraph-small"]',
      })
    })

    test('have to match the paragraph with additional elements', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="paragraph-additional"]',
      })
    })
  })
}

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Paragraph for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/elements/paragraph/demos/',
    })

    test('matches all sizes and weights', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="paragraph-sizes"]',
      })
    })
  })
}
