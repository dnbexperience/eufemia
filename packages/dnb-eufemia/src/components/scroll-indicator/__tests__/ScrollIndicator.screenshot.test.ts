import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken', 'coconut'])(
  'ScrollIndicator for %s',
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/web/components/scroll-indicator/demos/',
    })

    it('matches visible and hidden items', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="scroll-indicator-multiple"] .dnb-scroll-indicator',
      })
    })

    it('matches keyboard focus', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="scroll-indicator-multiple"] .dnb-scroll-indicator',
        simulateSelector: '.dnb-scroll-indicator__item',
        simulate: 'focus',
      })
    })

    it('matches dark mode', async () => {
      await makeScreenshot({
        colorScheme: 'dark',
        wrapperStyle: {
          background: 'var(--token-color-background-page-background)',
        },
        selector:
          '[data-visual-test="scroll-indicator-multiple"] .dnb-scroll-indicator',
      })
    })
  }
)

describe('ScrollIndicator in forced colors', () => {
  setupPageScreenshot({
    themeName: 'ui',
    url: '/web/components/scroll-indicator/demos/',
  })

  it('distinguishes visible and hidden items', async () => {
    await makeScreenshot({
      forcedColors: 'active',
      selector:
        '[data-visual-test="scroll-indicator-multiple"] .dnb-scroll-indicator',
    })
  })
})
