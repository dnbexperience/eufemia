import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Time field for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/extensions/forms/feature-fields/Time/demos/',
  })

  it('have to match the empty state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="time-empty"]',
    })
  })

  it('have to match the input filled in value', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="time-with-value"]',
    })
  })

  it('have to match the horizontal layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="time-horizontal-layout"]',
    })
  })

  it('have to match time with help button', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="time-with-help"]',
    })
  })

  it('have to match the disabled state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="time-disabled"]',
    })
  })

  it('have to match the error state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="time-error"]',
    })
  })

  it('have to match the with seconds variant', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="time-with-seconds"]',
    })
  })
})
