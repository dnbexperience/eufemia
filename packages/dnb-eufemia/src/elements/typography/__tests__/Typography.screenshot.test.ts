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

    it('matches font families and italic faces', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="font-families"]',
      })
    })

    it('matches the default headline before opting into Display', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="font-display"]',
        executeBeforeSimulate: () => {
          document
            .querySelector(
              '[data-visual-test="font-display"] .dnb-t__family--display'
            )
            .classList.remove('dnb-t__family--display')
        },
      })
    })

    it('matches opt-in Display headlines', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="font-display"]',
        executeBeforeSimulate: () => {
          document
            .querySelector(
              '[data-visual-test="font-display"] .dnb-h--xx-large'
            )
            .classList.add('dnb-t__family--display')
        },
      })
    })

    it('have to match all the typography variants', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="typography-variants"]',
      })
    })

    it('matches responsive typography on desktop', async () => {
      await makeScreenshot({
        pageViewport: { width: 1200 },
        selector: '[data-visual-test="typography-responsive"]',
      })
    })

    it('matches responsive typography on tablet', async () => {
      await makeScreenshot({
        pageViewport: { width: 750 },
        selector: '[data-visual-test="typography-responsive"]',
      })
    })

    it('matches responsive typography on mobile', async () => {
      await makeScreenshot({
        pageViewport: { width: 400 },
        selector: '[data-visual-test="typography-responsive"]',
      })
    })
  }
)
