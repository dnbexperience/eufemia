import { describe, it } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])('Focus outline for %s', (themeName) => {
  const selector = '[data-visual-test="focus-examples"]'

  setupPageScreenshot({
    themeName,
    url: '/web/accessibility/focus/',
    colorScheme: 'light',
  })

  it('shows both focus outlines together', async () => {
    await makeScreenshot({
      selector,
      executeBeforeSimulate: () => {
        const buttons = document.querySelectorAll<HTMLButtonElement>(
          '[data-visual-test="focus-examples"] button'
        )

        // Preserve each button's focus styles for the side-by-side comparison.
        for (const button of buttons) {
          button.focus()
          if (!button.matches(':focus-visible')) {
            throw new Error('The example must have visible keyboard focus')
          }
          const style = getComputedStyle(button)
          Object.assign(button.style, {
            outline: style.outline,
            outlineOffset: style.outlineOffset,
            borderColor: style.borderColor,
          })
        }
      },
    })
  })

  it('gives hover precedence over layout focus', async () => {
    await makeScreenshot({
      selector,
      simulateSelector: `${selector} button:last-child`,
      simulate: ['focus', 'hover'],
    })
  })
})
