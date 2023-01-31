/**
 * Screenshot Test
 *
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/jest/jestSetupScreenshots'

describe('Button with eiendom theme', () => {
  setupPageScreenshot({
    url: '/uilib/components/button/demos?dnb-theme=eiendom',
  })

  it('have to match "dnb-button--primary"', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-primary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--secondary"', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-secondary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match icon button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-icon"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--tertiary"', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-tertiary-all"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match disabled button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-disabled"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
