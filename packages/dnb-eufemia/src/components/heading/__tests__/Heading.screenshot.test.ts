import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken', 'eiendom'])(
  `Heading for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/heading/demos/',
    })

    it('have to match default headings', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-default"]',
      })
    })

    it('have to match headings with context usage', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-context"]',
      })
    })

    it('have to match headings with manual mixin', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="heading-mixin"]',
      })
    })
  }
)

describe.each(['sbanken'])(`Heading mobile for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/heading/demos/',
    pageViewport: {
      width: 400,
    },
  })

  it('have to match default headings', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="heading-default"]',
    })
  })

  it('have to match headings with context usage', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="heading-context"]',
    })
  })

  it('have to match headings with manual mixin', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="heading-mixin"]',
    })
  })
})
