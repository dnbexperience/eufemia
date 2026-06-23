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

    it('matches prose max width', async () => {
      await makeScreenshot({
        style: {
          'padding-bottom': '1rem',
          'padding-left': '1rem',
        },
        selector: '[data-visual-test="heading-prose-max-width"]',
      })
    })
  }
)
