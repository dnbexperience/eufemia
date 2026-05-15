import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('NumberFormat', () => {
  setupPageScreenshot({
    url: '/uilib/components/number-format/demos/',
  })

  it('have to match default numbers', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-default"]',
    })
  })

  it('have to match percent numbers', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-percent"]',
    })
  })

  it('have to match compact numbers', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-compact"]',
    })
  })

  it('have to match numbers in different locales', async () => {
    await makeScreenshot({
      style: { height: '30rem' },
      selector: '[data-visual-test="number-format-locales"]',
    })
  })

  it('have to match currency', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-currency"]',
    })
  })

  it('have to match phone', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-phone"]',
    })
  })

  it('have to match ban', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-ban"]',
    })
  })

  it('have to match nin', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-nin"]',
    })
  })

  it('have to match org', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-org"]',
    })
  })

  it('have to match spacing system usage', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-spacing"]',
    })
  })

  it('have to match monospace', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-monospace"]',
    })
  })
})

describe('NumberFormat with skeleton', () => {
  setupPageScreenshot({
    url: '/uilib/components/number-format/demos/?skeleton',
  })

  it('have to match default numbers', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-default"]',
    })
  })

  it('have to match currency', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-currency"]',
    })
  })

  it('have to match phone', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-phone"]',
    })
  })
})
