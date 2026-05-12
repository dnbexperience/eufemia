import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

const url =
  '/uilib/extensions/forms/feature-fields/PostalCodeAndCity/demos/'

describe.each(['ui'])(`PostalCodeAndCity for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url,
  })

  it('have to match with a label', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="postal-code-and-city-label"]',
    })
  })

  it('have to match with error', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="postal-code-and-city-error"]',
    })
  })
})

describe('PostalCodeAndCity', () => {
  it('have to match medium screen', async () => {
    await makeScreenshot({
      url,
      pageViewport: {
        width: 600,
      },
      selector: '[data-visual-test="postal-code-and-city-label"]',
    })
  })

  it('have to match small screen', async () => {
    await makeScreenshot({
      url,
      pageViewport: {
        width: 300,
      },
      selector: '[data-visual-test="postal-code-and-city-label"]',
    })
  })

  it('have to match long label', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="postal-code-and-city-long-label"]',
    })
  })
})
