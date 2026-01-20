import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

const url = '/uilib/extensions/forms/feature-fields/PhoneNumber/demos'

describe.each(['ui'])('PhoneNumber for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url,
  })

  it('have to match with a label', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="phone-number-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match with error', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="phone-number-error"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match widths', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '35rem' },
      selector: '[data-visual-test="phone-number-width"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('PhoneNumber', () => {
  it('have to match medium screen', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 600,
      },
      selector: '[data-visual-test="phone-number-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match small screen', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 300,
      },
      selector: '[data-visual-test="phone-number-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match long label', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="phone-number-long-label"]',
      style: { width: '25rem' },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match used in card', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="phone-number-in-card"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('matches when opened', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="phone-number-label"]',
      simulateSelector:
        '[data-visual-test="phone-number-label"] .dnb-autocomplete .dnb-input',
      simulate: 'click',
      waitAfterSimulateSelector:
        '[data-visual-test="phone-number-label"] .dnb-autocomplete--open',
      style: {
        height: '30rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
