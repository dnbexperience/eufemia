import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

const url = '/uilib/extensions/forms/feature-fields/DateOfBirth/demos/'

describe.each(['ui'])(`DateOfBirth for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url,
  })

  it('have to match default', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="date-of-birth-default"]',
    })
  })

  it('have to match label and value', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="date-of-birth-label-and-value"]',
    })
  })

  it('have to match with help', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="date-of-birth-help"]',
    })
  })

  it('have to match with disabled', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="date-of-birth-disabled"]',
    })
  })

  it('have to match with error', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="date-of-birth-error"]',
    })
  })

  it('have to match widths', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="date-of-birth-width"]',
    })
  })
})
