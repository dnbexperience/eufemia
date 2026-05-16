import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Input for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/input-masked/demos/',
  })

  it('have to match currency_mask', async () => {
    await makeScreenshot({
      // style,
      selector: '[data-visual-test="input-masked-currency_mask"]',
    })
  })

  it('have to match number_mask', async () => {
    await makeScreenshot({
      // style,
      selector: '[data-visual-test="input-masked-number_mask"]',
    })
  })

  it('have to match locale number', async () => {
    await makeScreenshot({
      // style,
      selector: '[data-visual-test="input-masked-number"]',
    })
  })

  it('have to match locale currency', async () => {
    await makeScreenshot({
      // style,
      selector: '[data-visual-test="input-masked-currency"]',
    })
  })
})
