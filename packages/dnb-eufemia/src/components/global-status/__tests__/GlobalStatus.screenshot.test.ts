/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

const style = { width: '25rem' }

describe.each(['ui', 'sbanken'])('GlobalStatus for %s', themeName => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/global-status/demos'
  })

  it('have to match the default state with custom content', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="global-status"] .dnb-global-status',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the info state and custom content', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector:
        '[data-visual-test="global-status-info"] .dnb-global-status',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  if (themeName !== 'sbanken') {
    it('have to match the close button in focus state', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector: '[data-visual-test="global-status"] .dnb-global-status',
        simulateSelector:
          '[data-visual-test="global-status"] .dnb-global-status__close-button',
        simulate: 'focus',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the close button in hover state', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector: '[data-visual-test="global-status"] .dnb-global-status',
        simulateSelector:
          '[data-visual-test="global-status"] .dnb-global-status__close-button',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
})
