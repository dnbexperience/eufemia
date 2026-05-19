import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Stat for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/stat/demos/',
  })

  it('has to match basic usage', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="stat-amount-default"]',
    })
  })

  it('has to match root and label', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="stat-root-and-label"]',
    })
  })

  it('has to match currency within trend', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="stat-currency-within-trend"]',
    })
  })

  it('has to match currency default', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="stat-currency-default"]',
    })
  })

  it('has to match percent default', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="stat-percent-default"]',
    })
  })

  it('has to match percent colorize by sign', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="stat-percent-colorize-by-sign"]',
    })
  })

  it('has to match rating default', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="stat-rating-default"]',
    })
  })

  it('has to match content-label-order with subtle label', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="stat-content-label-order-subtle-label"]',
    })
  })
})
