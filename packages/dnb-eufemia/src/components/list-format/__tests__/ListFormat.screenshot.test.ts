import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('ListFormat', () => {
  setupPageScreenshot({
    url: '/uilib/components/list-format/demos/',
  })

  it('have to match default list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="list-format-default"]',
    })
  })

  it('have to match custom format', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="list-format-custom-format"]',
    })
  })

  it('have to match inline', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="list-format-inline"]',
    })
  })

  it('have to match variants', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="list-format-variants"]',
    })
  })

  it('have to match types', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="list-format-types"]',
    })
  })

  it('have to list format function', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="list-format-function"]',
    })
  })
})
