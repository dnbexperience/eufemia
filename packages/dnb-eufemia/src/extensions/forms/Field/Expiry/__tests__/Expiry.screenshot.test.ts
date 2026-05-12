import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Expiry field for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/extensions/forms/feature-fields/Expiry/demos/',
  })

  it('have to match the empty state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="expiry-empty"]',
    })
  })

  it('have to match the input filled in value', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="expiry-with-value"]',
    })
  })

  it('have to match the horizontal layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="expiry-horizontal-layout"]',
    })
  })

  it('have to match expiry with help button', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="expiry-with-help"]',
    })
  })

  it('have to match the disabled state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="expiry-disabled"]',
    })
  })

  it('have to match the error state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="expiry-error"]',
    })
  })
})
