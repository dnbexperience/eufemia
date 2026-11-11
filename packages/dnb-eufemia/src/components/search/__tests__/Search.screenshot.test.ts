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
          selector: `[data-visual-test="search-${variant}-group"]`,
          wrapperStyle: { width: variant === 'hero' ? '42rem' : '20rem' },
        })
      }
    )

    it('matches compact expanded on focus', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="search-compact"]',
        style: { width: '17.5rem', 'max-width': '100%' },
        wrapperStyle: { width: '19.5rem' },
        simulateSelector: '[data-visual-test="search-compact"] input',
        simulate: 'focus',
      })
    })

    it('matches the hero in dark mode', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="search-hero"]',
        style: { width: '40rem', 'max-width': '100%' },
        wrapperStyle: {
          width: '42rem',
          background: 'var(--token-color-background-page-background)',
        },
        colorScheme: 'dark',
      })
    })

    it('matches compact on a small screen', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="search-compact"]',
        pageViewport: { width: 320 },
        style: { width: '17.5rem', 'max-width': '100%' },
        wrapperStyle: { width: '20rem' },
      })
    })

    it('matches the autocomplete hero', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="search-autocomplete-hero"]',
        style: { width: '40rem', 'max-width': '100%' },
        wrapperStyle: { width: '42rem' },
      })
    })

    it.each(['hero', 'autocomplete-hero'])(
      'matches the %s clear button',
      async (variant) => {
        await makeScreenshot({
          selector: `[data-visual-test="search-${variant}"]`,
          style: { width: '40rem', 'max-width': '100%' },
          wrapperStyle: { width: '42rem' },
          simulate: [
            {
              action: 'focus',
              selector: `[data-visual-test="search-${variant}"] input`,
            },
            { keypress: 'b' },
            ...(variant === 'autocomplete-hero'
              ? [{ keypress: 'Escape' }]
              : []),
          ],
        })
      }
    )

    it('matches the compact autocomplete', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="search-autocomplete-compact"]',
        style: { width: '17.5rem', 'max-width': '100%' },
        wrapperStyle: { width: '19.5rem' },
      })
    })

    it('matches the autocomplete expanded on focus', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="search-autocomplete-compact"]',
        simulateSelector:
          '[data-visual-test="search-autocomplete-compact"] input',
        style: { width: '17.5rem', 'max-width': '100%' },
        simulate: 'focus',
        wrapperStyle: { width: '19.5rem' },
      })
    })

    it.each(['default', 'dark', 'small', 'sorting', 'keyboard'])(
      'matches the panel with controls in %s mode',
      async (mode) => {
        await makeScreenshot({
          selector: '[data-visual-test="search-panel"]',
          executeBeforeSimulate: () => {
            document
              .querySelector('[data-visual-test="search-panel"]')
              .scrollIntoView({ block: 'start' })
          },
          simulate: [
            {
              action: 'focus',
              selector: '[data-visual-test="search-panel"] input',
            },
            ...(mode === 'sorting'
              ? [
                  {
                    action: 'click' as const,
                    selector:
                      '.dnb-search__panel .dnb-button[aria-haspopup="menu"]',
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
          pageViewport: {
            height: 640,
            ...(mode === 'small' ? { width: 320 } : {}),
          },
        })
      }
    )
  }
)
