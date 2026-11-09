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
  }
)
