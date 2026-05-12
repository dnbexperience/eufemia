import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Menu for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/menu/demos/',
  })

  it('have to match menu with accordion item', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="menu-accordion"]',
      style: {
        'padding-bottom': '14rem',
        width: '12rem',
      },
      simulate: 'click',
      simulateSelector: '[data-visual-test="menu-accordion"] .dnb-button',
      simulateAfter: { keypress: 'Escape' },
    })
  })
})
