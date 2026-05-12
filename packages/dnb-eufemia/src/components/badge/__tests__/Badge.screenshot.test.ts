import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken', 'carnegie'])(
  `Badge for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/badge/demos/',
    })

    describe('variant', () => {
      it('have to match variant notification', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-notification"] .dnb-badge',
        })
      })
      it('have to match variant notification inline with text', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-notification-inline"]',
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
      it('have to match variant information for avatar as content', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="badge-variant-information-avatar"] .dnb-badge__root',
        })
      })
    })
    describe('positioning', () => {
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
    describe('status', () => {
      it('have to match all status variants', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="badge-status"]',
        })
      })
    })
  }
)
