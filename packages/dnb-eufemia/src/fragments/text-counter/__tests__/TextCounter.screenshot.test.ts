import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`TextCounter for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/fragments/text-counter/demos/',
  })

  it('have to character counter downwards', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="text-counter-down"]',
    })
  })

  it('have to character counter upwards', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="text-counter-up"]',
    })
  })

  it('have to character counter exceeded', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="text-counter-exceeded"]',
    })
  })
})

// Eiendom reuses the DNB token palette.
describe.each(['ui', 'sbanken', 'eiendom'])(
  'TextCounter on filled surfaces for %s dark',
  (themeName) => {
    setupPageScreenshot({
      themeName,
      colorScheme: 'dark',
      url: '/uilib/components/fragments/text-counter/demos/',
    })

    it('keeps over-limit text readable inside a filled form section', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="text-counter-filled-error"]',
      })
    })
  }
)
