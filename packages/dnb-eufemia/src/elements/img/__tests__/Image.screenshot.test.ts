import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Image', () => {
  setupPageScreenshot({
    url: '/uilib/elements/image/demos/',
  })

  it('have to match default image element', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="image-plain"]',
    })
  })

  it('have to match image element with no source', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="image-no-source"]',
    })
  })

  it('have to match image element with caption', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="image-caption"]',
    })
  })

  it('have to match image element with skeleton', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="image-skeleton"]',
    })
  })
})
