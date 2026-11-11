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

  it('shows the action outline with a transparent gap', async () => {
    await makeScreenshot({
      selector,
      simulateSelector: `${selector} button:first-child`,
      simulate: 'focus',
    })
  })

  it('shows the layout outline without a gap', async () => {
    await makeScreenshot({
      selector,
      simulateSelector: `${selector} button:last-child`,
      simulate: 'focus',
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
