/**
 * Screenshot Test
 *
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/jest/jestSetupScreenshots'

describe('Button with sbanken theme', () => {
  setupPageScreenshot({
    url: '/uilib/components/button/demos?eufemia-theme=sbanken',
  })

  it('have to match "dnb-button--primary"', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-primary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--primary" with hover state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-primary"]',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--primary" with active state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-primary"]',
      simulate: 'active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--primary" with focus state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-primary"]',
      simulate: 'focus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--secondary"', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-secondary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--secondary" with hover state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-secondary"]',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--secondary" with active state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-secondary"]',
      simulate: 'active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--secondary" with focus state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-secondary"]',
      simulate: 'focus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
