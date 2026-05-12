import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Heading', () => {
  setupPageScreenshot({
    url: '/uilib/elements/heading/demos/',
  })

  test('matches prose max width', async () => {
    await makeScreenshot({
      style: {
        'padding-bottom': '1rem',
        'padding-left': '1rem',
      },
      selector: '[data-visual-test="heading-prose-max-width"]',
    })
  })
})

for (const themeName of ['ui', 'sbanken', 'eiendom', 'carnegie']) {
  test.describe(`Heading for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/elements/heading/demos/',
    })

    test('have to match the default heading examples', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-default"]',
      })
    })

    test('have to match the additional heading examples', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-additional"]',
      })
    })

    test('matches basic levels', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-basics"]',
      })
    })

    test('matches all sizes and variants', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-sizes"]',
      })
    })

    test('matches base component', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-base"]',
      })
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
      await makeScreenshot({
        selector: '[data-visual-test="heading-default"]',
      })
    })

    test('have to match the additional heading examples', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-additional"]',
      })
    })

    test('matches basic levels', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-basics"]',
      })
    })

    test('matches all sizes and variants', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-sizes"]',
      })
    })

    test('matches base component', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-base"]',
      })
    })
  })
}
