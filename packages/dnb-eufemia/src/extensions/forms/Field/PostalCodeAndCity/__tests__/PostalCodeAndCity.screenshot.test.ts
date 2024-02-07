import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

const url =
  '/uilib/extensions/forms/feature-fields/PostalCodeAndCity/demos'

describe.each(['ui'])('PostalCodeAndCity for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url,
  })

  it('have to match with a label', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="postal-code-and-city-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match with error', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="postal-code-and-city-error"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('PostalCodeAndCity', () => {
  it('have to match medium screen', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 600,
      },
      selector: '[data-visual-test="postal-code-and-city-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match small screen', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 300,
      },
      selector: '[data-visual-test="postal-code-and-city-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match long label', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="postal-code-and-city-long-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
