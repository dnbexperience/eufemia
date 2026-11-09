import { describe, it } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken', 'carnegie'])(
  'Chip for %s',
  (themeName) => {
    setupPageScreenshot({ themeName, url: '/web/components/chip/demos/' })

    it('matches selected, disabled, and read-only states', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="chip-states"]',
      })
    })

    it.each(['hover', 'active'] as const)(
      'matches %s states',
      async (simulate) => {
        await makeScreenshot({
          selector: '[data-visual-test="chip-states"]',
          simulate,
        })
      }
    )

    it.each([
      'error',
      'variants',
      'dark-surface',
      'skeleton',
      'groups',
      'group-appearances',
    ])('matches %s', async (fixture) => {
      await makeScreenshot({
        selector: '[data-visual-test="chip-' + fixture + '"]',
      })
    })

    it('matches the dark color scheme', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="chip-states"]',
        colorScheme: 'dark',
      })
    })
  }
)

describe('Chip layout and focus', () => {
  setupPageScreenshot({
    themeName: 'ui',
    url: '/web/components/chip/demos/',
  })

  it.each(['default', 'addable', 'checkbox', 'radio'])(
    'shows keyboard focus for %s',
    async (variant) => {
      const selector =
        '[data-visual-test="chip-states"] .dnb-chip--' + variant
      await makeScreenshot({
        selector,
        simulateSelector: selector + ' input',
        simulate: 'focus',
      })
    }
  )

  it('wraps long labels on a narrow screen', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="chip-long-labels"]',
      pageViewport: { width: 320 },
    })
  })
})
