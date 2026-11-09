import { describe, it } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

const darkWrapperStyle = {
  background: 'var(--token-color-background-page-background)',
}

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
      'flags-and-logos',
      'dark-surface',
      'skeleton',
      'groups',
      'group-appearances',
      'tooltips',
      'sizes',
      'option-help',
    ])('matches %s', async (fixture) => {
      await makeScreenshot({
        selector: '[data-visual-test="chip-' + fixture + '"]',
      })
    })

    it.each(['hover', 'active'] as const)(
      'matches error %s states',
      async (simulate) => {
        await makeScreenshot({
          selector: '[data-visual-test="chip-error"]',
          simulate,
        })
      }
    )

    it.each([
      { state: 'default', simulate: undefined },
      { state: 'hover', simulate: 'hover' },
      { state: 'active', simulate: 'active' },
    ] as const)(
      'matches dark error $state states',
      async ({ simulate }) => {
        await makeScreenshot({
          selector: '[data-visual-test="chip-error"]',
          simulate,
          colorScheme: 'dark',
          wrapperStyle: darkWrapperStyle,
        })
      }
    )

    it('matches the dark color scheme', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="chip-states"]',
        colorScheme: 'dark',
        wrapperStyle: darkWrapperStyle,
      })
    })

    it('matches flags and logos in the dark color scheme', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="chip-flags-and-logos"]',
        colorScheme: 'dark',
        wrapperStyle: darkWrapperStyle,
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

  it.each(['light', 'dark'] as const)(
    'shows keyboard focus on a selected chip with an error in %s mode',
    async (colorScheme) => {
      const selector = '[data-visual-test="chip-groups"]'
      await makeScreenshot({
        selector,
        simulateSelector: selector + ' input[type="checkbox"]:checked',
        simulate: 'focus',
        colorScheme,
        wrapperStyle:
          colorScheme === 'dark' ? darkWrapperStyle : undefined,
      })
    }
  )

  it.each(['checkbox', 'radio'])(
    'shows keyboard focus for selected %s chips in multiple selection groups',
    async (variant) => {
      const selector =
        '[data-visual-test="chip-group-appearances"] .dnb-chip-group:has(.dnb-chip--' +
        variant +
        ' input[type="checkbox"])'
      await makeScreenshot({
        selector,
        simulateSelector: selector + ' input:checked',
        simulate: 'focus',
      })
    }
  )

  it.each(['light', 'dark'] as const)(
    'shows keyboard focus for selected radios in %s mode',
    async (colorScheme) => {
      const selector =
        '[data-visual-test="chip-group-appearances"] .dnb-chip-group:has(.dnb-chip--radio input[type="radio"])'
      await makeScreenshot({
        selector,
        simulateSelector: selector + ' input:checked',
        simulate: 'focus',
        colorScheme,
        wrapperStyle:
          colorScheme === 'dark' ? darkWrapperStyle : undefined,
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
