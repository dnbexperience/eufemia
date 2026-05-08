import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('Heading', () => {
  setupPageScreenshot({
    url: '/uilib/elements/heading/demos/',
  })

  test('matches prose max width', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-bottom': '1rem',
        'padding-left': '1rem',
      },
      selector: '[data-visual-test="heading-prose-max-width"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})

for (const themeName of ['ui', 'sbanken', 'eiendom', 'carnegie']) {
  test.describe(`Heading for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/elements/heading/demos/',
    })

    test('have to match the default heading examples', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-default"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the additional heading examples', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-additional"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('matches basic levels', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-basics"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('matches all sizes and variants', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-sizes"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('matches base component', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-base"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}

for (const themeName of ['sbanken']) {
  test.describe(`Heading mobile for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/elements/heading/demos/',
      pageViewport: {
        width: 400,
      },
    })
    test('have to match the default heading examples', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-default"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the additional heading examples', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-additional"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('matches basic levels', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-basics"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('matches all sizes and variants', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-sizes"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('matches base component', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="heading-base"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
