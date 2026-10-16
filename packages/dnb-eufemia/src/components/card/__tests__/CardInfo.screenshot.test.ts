import { describe, it } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken', 'carnegie'])(
  'Card.Info for %s',
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/card/demos/',
    })

    it.each(['layout', 'actions', 'close', 'graphic'])(
      'matches %s',
      async (variant) => {
        await makeScreenshot({
          selector: '[data-visual-test="card-info-' + variant + '"]',
        })
      }
    )

    it('matches the mobile layout', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="card-info-layout"]',
        pageViewport: { width: 400 },
      })
    })

    it('matches the mobile close button', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="card-info-close"]',
        pageViewport: { width: 400 },
      })
    })

    it('matches the dark layout', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="card-info-layout"]',
        colorScheme: 'dark',
      })
    })

    it('matches keyboard focus on a whole-card action', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="card-info-actions"]',
        simulateSelector:
          '[data-visual-test="card-info-actions"] .dnb-card-action',
        simulate: 'focusclick',
      })
    })
  }
)
