import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(
  `ProgressIndicator for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/progress-indicator/demos/',
    })

    it('with label inside', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="progress-indicator-label-inside"]',
      })
    })

    it('have to match the static primary circular with 50 percentage', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="progress-indicator-circular--primary"] .dnb-progress-indicator',
      })
    })

    it('have to match the static primary linear with 50 percentage', async () => {
      await makeScreenshot({
        style: {
          width: '20rem',
        },
        selector:
          '[data-visual-test="progress-indicator-linear--primary"] .dnb-progress-indicator',
      })
    })

    it('with custom colors and size', async () => {
      await makeScreenshot({
        style: {
          width: '20rem',
        },
        selector: '[data-visual-test="progress-indicator-customization"]',
      })
    })

    it('have to match customized horizontal', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="progress-indicator-custom-horizontal"]',
      })
    })

    it('have to match customized  countdown', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="progress-indicator-custom-countdown"]',
      })
    })
  }
)

describe.each(['ui', 'sbanken'])(
  `ProgressIndicator circular for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/progress-indicator/visual-tests/',
    })

    it('have to match static primary circular sizes', async () => {
      await makeScreenshot({
        style: {
          height: '3.5rem',
          width: '8rem',
        },
        selector: '[data-visual-test="progress-indicator-sizes"]',
      })
    })
  }
)
