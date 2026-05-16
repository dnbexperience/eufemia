import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Span for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/elements/span/demos/',
  })

  it('basics', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="span-basic"]',
    })
  })

  it('with modifiers', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="span-modifiers"]',
    })
  })

  it('all sizes and weights', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="span-sizes"]',
    })
  })
})
