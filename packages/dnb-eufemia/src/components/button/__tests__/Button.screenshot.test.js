/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  isCI,
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Button primary', () => {
  setupPageScreenshot({ url: '/uilib/components/button/demos' })

  if (!isCI) {
    it('have to match primary button with href', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="button-anchor"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }

  it('have to match "dnb-button--primary"', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-primary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--primary" with focus state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-primary"]',
      simulate: 'focus', // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--primary" with hover state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-primary"]',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a stretched button', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        'min-width': '20rem',
      },
      selector: '[data-visual-test="button-stretch"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--primary" with active state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-primary"]',
      simulate: 'active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Button secondary', () => {
  setupPageScreenshot({ url: '/uilib/components/button/demos' })

  it('have to match "dnb-button--secondary"', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-secondary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--secondary" with focus state', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        'padding-right': '2rem',
      },
      selector: '[data-visual-test="button-secondary"]',
      simulate: 'focus', // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--secondary" with hover state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-secondary"]',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--secondary" with active state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-secondary"]',
      simulate: 'active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Button icon', () => {
  setupPageScreenshot({ url: '/uilib/components/button/demos' })

  it('have to match icon button', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-icon"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match icon button with focus state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-icon"]',
      simulate: 'focus', // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match icon button with hover state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-icon"]',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match icon button with active state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-icon"]',
      simulate: 'active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Button target blank', () => {
  it('have to match with tooltip', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        'padding-top': '2rem',
      },
      selector: '[data-visual-test="button-anchor"]',
      simulateSelector:
        '[data-visual-test="button-anchor"] a[target="_blank"]',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Button unstyled', () => {
  setupPageScreenshot({ url: '/uilib/components/button/demos' })

  it('have to match "dnb-button--unstyled" with icon', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-unstyled"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Button tertiary', () => {
  setupPageScreenshot({ url: '/uilib/components/button/demos' })

  it('have to match "dnb-button--tertiary" without icon', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-tertiary-no-icon"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--tertiary"', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-tertiary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--tertiary" with focus state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-tertiary"]',
      simulate: 'focus', // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--tertiary" with hover state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-tertiary"]',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--tertiary" with active state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-tertiary"]',
      simulate: 'active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match all tertiary buttons', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-tertiary-all"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tertiary with top icon', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-tertiary-top"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match disabled buttons', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-disabled"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match button with custom content', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-custom-content"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tertiary button with text wrap', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '20rem',
        height: '6rem',
      },
      selector: '[data-visual-test="button-tertiary-wrap"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Button signal', () => {
  setupPageScreenshot({ url: '/uilib/components/button/demos' })

  it('have to match "dnb-button--signal"', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-signal"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--signal" with focus state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-signal"]',
      simulate: 'focus', // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--signal" with hover state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-signal"]',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "dnb-button--signal" with active state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="button-signal"]',
      simulate: 'active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
