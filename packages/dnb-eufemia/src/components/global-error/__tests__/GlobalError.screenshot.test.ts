import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`GlobalError for %s`, (themeName) => {
  const pageViewport = {
    width: 400,
  }

  setupPageScreenshot({
    themeName,
    pageViewport,
    url: '/uilib/components/global-error/demos/',
  })

  it('have to match the 404 status', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="global-error-404"]',
    })
  })

  it('have to match the 500 status', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="global-error-500"]',
    })
  })

  it('have to match the custom status', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="global-error-custom"]',
    })
  })
})
