/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Menu for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/menu/demos/',
  })

  it('have to match menu with accordion item', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="menu-accordion"]',
      style: {
        'padding-bottom': '14rem',
        width: '12rem',
      },
      simulate: 'click',
      simulateSelector: '[data-visual-test="menu-accordion"] .dnb-button',
      simulateAfter: { keypress: 'Escape' },
    })

    expect(screenshot).toMatchImageSnapshot()
  })
})
