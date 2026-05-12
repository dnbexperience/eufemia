import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

const url = '/uilib/extensions/forms/feature-fields/PhoneNumber/demos/'

describe.each(['ui'])(`PhoneNumber for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url,
  })

  it('have to match with a label', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="phone-number-label"]',
    })
  })

  it('have to match with error', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="phone-number-error"]',
    })
  })

  it('have to match widths', async () => {
    await makeScreenshot({
      style: { width: '35rem' },
      selector: '[data-visual-test="phone-number-width"]',
    })
  })
})

describe('PhoneNumber', () => {
  it('have to match medium screen', async () => {
    await makeScreenshot({
      url,
      pageViewport: {
        width: 600,
      },
      selector: '[data-visual-test="phone-number-label"]',
    })
  })

  it('have to match small screen', async () => {
    await makeScreenshot({
      url,
      pageViewport: {
        width: 300,
      },
      selector: '[data-visual-test="phone-number-label"]',
    })
  })

  it('have to match long label', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="phone-number-long-label"]',
      style: { width: '25rem' },
    })
  })

  it('have to match used in card', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="phone-number-in-card"]',
    })
  })

  it('matches when opened', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="phone-number-label"]',
      simulateSelector:
        '[data-visual-test="phone-number-label"] .dnb-autocomplete .dnb-input',
      simulate: 'click',
      style: {
        height: '30rem',
      },
    })
  })
})
