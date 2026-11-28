import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken', 'coconut', 'carnegie'])(
  `Badge for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/web/components/badge/demos/',
    })

    describe('variant', () => {
      it('have to match variant notification', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-notification"] .dnb-badge',
        })
      })
      it('keeps notification numbers independent of inherited line height', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="badge-notification-numbers"]',
          executeBeforeSimulate: () => {
            const container = document.querySelector<HTMLElement>(
              '[data-visual-test="badge-notification-numbers"] .dnb-flex-container'
            )
            container.style.lineHeight = '40px'

            for (const badge of container.querySelectorAll('.dnb-badge')) {
              if (getComputedStyle(badge).lineHeight === '40px') {
                throw new Error(
                  'Notification numbers must not inherit the surrounding control line height'
                )
              }
            }
          },
        })
      })
      it('have to match variant notification inline with text', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-notification-inline"]',
        })
      })
      it('have to match variant notification without content as an indicator', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="badge-notification-indicator"]',
        })
      })
      it('have to match variant notification for avatar as content', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-notification-avatar"] .dnb-badge__root',
        })
      })

      it('have to match variant information as default variant', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-default"] .dnb-badge',
        })
      })
      it('have to match variant information inline with text', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-information-inline"]',
        })
      })
      it('have to match variant information with formatted content', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-information-formatted-content"] .dnb-badge',
        })
      })
      it('have to match variant information for avatar as content', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-information-avatar"] .dnb-badge__root',
        })
      })
    })
    describe('positioning', () => {
      it('positions counts at icon button corners', async () => {
        await makeScreenshot({
          url: '/web/components/badge/visual-tests/icon-buttons/',
          selector: '[data-visual-test="badge-icon-buttons"]',
        })
      })

      it('keeps badges clear of wrapped button labels', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="badge-button"] .dnb-badge__root',
        })
        await makeScreenshot({
          selector: '[data-visual-test="badge-button-sizes"]',
        })
      })
      it('have to match top left positioning', async () => {
        await makeScreenshot({
          selector:
            '.dnb-badge__root:has([data-visual-test="badge-top-left"])',
        })
      })
      it('have to match top right positioning', async () => {
        await makeScreenshot({
          selector:
            '.dnb-badge__root:has([data-visual-test="badge-top-right"])',
        })
      })
      it('have to match bottom left positioning', async () => {
        await makeScreenshot({
          selector:
            '.dnb-badge__root:has([data-visual-test="badge-bottom-left"])',
        })
      })
      it('have to match bottom right positioning', async () => {
        await makeScreenshot({
          selector:
            '.dnb-badge__root:has([data-visual-test="badge-bottom-right"])',
        })
      })
    })
    describe('icon', () => {
      it('have to match an icon, a country flag and a logo', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="badge-icon"]',
        })
      })
    })
    describe('status', () => {
      it('have to match all status variants', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="badge-status"]',
        })
      })

      if (themeName !== 'carnegie') {
        it('have to match all status variants in dark mode', async () => {
          await makeScreenshot({
            selector: '[data-visual-test="badge-status"]',
            colorScheme: 'dark',
            wrapperStyle: {
              background: 'var(--token-color-background-page-background)',
            },
          })
        })
      }
    })
  }
)
