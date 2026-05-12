import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Heading', () => {
  setupPageScreenshot({
    url: '/uilib/elements/heading/demos/',
  })

  it('matches prose max width', async () => {
    await makeScreenshot({
      style: {
        'padding-bottom': '1rem',
        'padding-left': '1rem',
      },
      selector: '[data-visual-test="heading-prose-max-width"]',
    })
  })
})

describe.each(['ui', 'sbanken', 'eiendom', 'carnegie'])(
  `Heading for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/elements/heading/demos/',
    })

    it('have to match the default heading examples', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-default"]',
      })
    })

    it('have to match the additional heading examples', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-additional"]',
      })
    })

    it('matches basic levels', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-basics"]',
      })
    })

    it('matches all sizes and variants', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-sizes"]',
      })
    })

    it('matches base component', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-base"]',
      })
    })
  }
)

describe.each(['sbanken'])(`Heading mobile for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/elements/heading/demos/',
    pageViewport: {
      width: 400,
    },
  })
  it('have to match the default heading examples', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="heading-default"]',
    })
  })

  it('have to match the additional heading examples', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="heading-additional"]',
    })
  })

  it('matches basic levels', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="heading-basics"]',
    })
  })

  it('matches all sizes and variants', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="heading-sizes"]',
    })
  })

  it('matches base component', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="heading-base"]',
    })
  })
})
