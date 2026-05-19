import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken', 'eiendom', 'carnegie'])(
  `Typography for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/typography/',
    })

    it('have to match all the typography variants', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="typography-variants"]',
      })
    })
  }
)

describe.each(['sbanken'])(`Typography mobile for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/typography/',
    pageViewport: {
      width: 400,
    },
  })

  it('have to match all the typography variants', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="typography-variants"]',
    })
  })
})
