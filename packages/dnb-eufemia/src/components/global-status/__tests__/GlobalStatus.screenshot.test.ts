import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

const style = { width: '25rem' }

describe.each(['ui', 'sbanken'])(`GlobalStatus for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/global-status/demos/',
  })

  it('have to match the default state with custom content', async () => {
    await makeScreenshot({
      style,
      selector: '[data-visual-test="global-status"] .dnb-global-status',
    })
  })

  it('have to match the info state and custom content', async () => {
    await makeScreenshot({
      style,
      selector:
        '[data-visual-test="global-status-information"] .dnb-global-status',
    })
  })

  it('have to match the success state and custom content', async () => {
    await makeScreenshot({
      style,
      selector:
        '[data-visual-test="global-status-success"] .dnb-global-status',
    })
  })

  it('have to match the custom icon', async () => {
    await makeScreenshot({
      style,
      selector:
        '[data-visual-test="global-status-icon"] .dnb-global-status',
    })
  })

  if (themeName !== 'sbanken') {
    it('have to match the close button in focus state', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="global-status"] .dnb-global-status',
        simulateSelector:
          '[data-visual-test="global-status"] .dnb-global-status__close-button',
        simulate: 'focus',
      })
    })

    it('have to match the close button in hover state', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="global-status"] .dnb-global-status',
        simulateSelector:
          '[data-visual-test="global-status"] .dnb-global-status__close-button',
        simulate: 'hover',
      })
    })
  }
})
