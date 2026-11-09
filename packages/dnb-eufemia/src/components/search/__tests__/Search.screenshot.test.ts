import { describe, it } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken', 'carnegie'])(
  'Search for %s',
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/web/components/search/demos/',
    })

    it.each(['default', 'hero', 'compact'])(
      'matches the %s variant',
      async (variant) => {
        await makeScreenshot({
          selector: `[data-visual-test="search-${variant}"]`,
        })
      }
    )

    it('matches compact expanded on focus', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="search-compact"]',
        simulateSelector: '[data-visual-test="search-compact"] input',
        simulate: 'focus',
      })
    })

    it('matches the hero in dark mode', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="search-hero"]',
        colorScheme: 'dark',
      })
    })

    it('matches compact on a small screen', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="search-compact"]',
        pageViewport: { width: 320 },
      })
    })

    it('matches the autocomplete hero', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="search-autocomplete-hero"]',
      })
    })

    it('matches the opt-in pill shape for both inputs', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="search-pill"]',
      })
    })

    it('matches the compact autocomplete', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="search-autocomplete-compact"]',
      })
    })

    it('matches the autocomplete expanded on focus', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="search-autocomplete-compact"]',
        simulateSelector:
          '[data-visual-test="search-autocomplete-compact"] input',
        simulate: 'focus',
      })
    })

    it.each(['default', 'dark', 'small', 'sorting', 'keyboard'])(
      'matches the popover with controls in %s mode',
      async (mode) => {
        await makeScreenshot({
          selector: '[data-visual-test="search-popover"]',
          simulate: [
            {
              action: 'focus',
              selector: '[data-visual-test="search-popover"] input',
            },
            ...(mode === 'sorting'
              ? [
                  {
                    action: 'click' as const,
                    selector:
                      '.dnb-search__popover .dnb-button[aria-haspopup="menu"]',
                  },
                ]
              : []),
            ...(mode === 'keyboard' ? [{ keypress: 'ArrowDown' }] : []),
          ],
          style: {
            'padding-bottom': '36rem',
            ...(mode === 'small'
              ? {}
              : { 'min-width': '40rem', 'padding-left': '8rem' }),
          },
          ...(mode === 'dark' ? { colorScheme: 'dark' } : {}),
          ...(mode === 'small' ? { pageViewport: { width: 320 } } : {}),
        })
      }
    )
  }
)
