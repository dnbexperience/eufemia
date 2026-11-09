import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken', 'carnegie'])(
  `Chip for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/web/components/chip/demos/',
    })

    describe.each(['default', 'add-remove', 'checkbox', 'radio'])(
      'variant %s',
      (variant) => {
        const selector = `[data-visual-test="chip-${variant}"]`
        const simulateSelector = `${selector} .dnb-chip:nth-of-type(2) .dnb-toggle-button__button`
        const checkedSelector = `${selector} .dnb-toggle-button--checked .dnb-toggle-button__button`

        it('have to match', async () => {
          await makeScreenshot({ selector })
        })

        it('have to match hover', async () => {
          await makeScreenshot({
            selector,
            simulateSelector,
            simulate: 'hover',
          })
        })

        it('have to match active', async () => {
          await makeScreenshot({
            selector,
            simulateSelector,
            simulate: 'active',
          })
        })

        it('have to match focus', async () => {
          await makeScreenshot({
            selector,
            simulateSelector,
            simulate: 'focus',
          })
        })

        it('have to match checked hover', async () => {
          await makeScreenshot({
            selector,
            simulateSelector: checkedSelector,
            simulate: 'hover',
          })
        })

        it('have to match checked active', async () => {
          await makeScreenshot({
            selector,
            simulateSelector: checkedSelector,
            simulate: 'active',
          })
        })
      }
    )

    it('have to match with icon and flag', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="chip-icon"]',
      })
    })

    it('have to match disabled', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="chip-disabled"]',
      })
    })

    it('have to match status', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="chip-status"]',
      })
    })

    it.each(['hover', 'active'] as const)(
      'have to match status %s',
      async (simulate) => {
        await makeScreenshot({
          selector: '[data-visual-test="chip-status"]',
          simulateSelector:
            '[data-visual-test="chip-status"] .dnb-toggle-button--checked .dnb-toggle-button__button',
          simulate,
        })
      }
    )
  }
)
