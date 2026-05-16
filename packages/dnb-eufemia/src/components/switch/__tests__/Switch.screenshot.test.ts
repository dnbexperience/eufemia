import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(
  `Unchecked Switch for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/switch/demos/',
    })

    it('have to match switch in unchecked state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="switch-default"] .dnb-switch',
      })
    })

    it('have to match switch in unchecked state with focus', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="switch-default"] .dnb-switch',
        simulateSelector:
          '[data-visual-test="switch-default"] .dnb-switch__input',
        simulate: 'focus', // should be tested first
      })
    })

    it('have to match switch in unchecked state with hover', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="switch-default"] .dnb-switch',
        simulateSelector:
          '[data-visual-test="switch-default"] .dnb-switch__input',
        simulate: 'hover',
      })
    })

    it('have to match switch in unchecked state with error', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="switch-error"] .dnb-switch',
        simulate: [
          {
            action: 'click',
            selector:
              '[data-visual-test="switch-error"] .dnb-switch__input',
          },
          {
            action: 'click',
            selector: 'body',
          },
        ],
      })
    })
  }
)

// NB: Because of focus simulation and screenshotElement.press('Tab')
// we have to run the two focus simulations in a separate run each
describe.each(['ui', 'sbanken'])(`Checked Switch for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/switch/demos/',
  })

  it('have to match switch in checked state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="switch-checked"] .dnb-switch',
    })
  })

  it('have to match switch in checked state with focus', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="switch-checked"] .dnb-switch',
      simulateSelector:
        '[data-visual-test="switch-checked"] .dnb-switch__input',
      simulate: 'focus', // should be tested first
    })
  })

  it('have to match switch in checked state with hover', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="switch-checked"] .dnb-switch',
      simulateSelector:
        '[data-visual-test="switch-checked"] .dnb-switch__input',
      simulate: 'hover',
    })
  })

  it('have to match switch in different sizes', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="switch-sizes"]',
    })
  })

  it('have to match disabled switch', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="switch-disabled"] .dnb-switch',
    })
  })

  it('have to match switch in error state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="switch-error"] .dnb-switch',
    })
  })
})
