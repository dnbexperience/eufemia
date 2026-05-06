import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('Paragraph', () => {
  setupPageScreenshot({
    url: '/uilib/elements/paragraph/demos/',
  })

  test('matches prose max width', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="paragraph-prose-max-width"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Paragraph for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/elements/paragraph/demos/',
    })

    test('have to match the paragraph with weight modifiers', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="paragraph-modifiers-weight"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the paragraph with size modifiers', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="paragraph-modifiers-size"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the paragraph with align modifiers', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="paragraph-modifiers-align"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the paragraph with family modifiers', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="paragraph-modifiers-family"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the paragraph with line modifiers', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="paragraph-modifiers-line"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the paragraph with other modifiers', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="paragraph-modifiers-other"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the paragraph example', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="paragraph-default"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the paragraph with small text', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="paragraph-small"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the paragraph with additional elements', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="paragraph-additional"]',
      })
      expect(screenshot).toMatchSnapshot()
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
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="paragraph-sizes"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
