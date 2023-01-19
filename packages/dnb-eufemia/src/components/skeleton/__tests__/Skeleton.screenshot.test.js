/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Skeleton ', () => {
  setupPageScreenshot({ url: '/uilib/components/skeleton/demos' })

  it('have to match skeleton article figure', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem', height: '20rem' },
      selector: '[data-visual-test="skeleton-figure-article"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match excluded components', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem', height: '20rem' },
      selector: '[data-visual-test="skeleton-exclude"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a removed skeleton', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem', height: '20rem' },
      selector: '[data-visual-test="skeleton-exclude"]',
      simulateSelector:
        '[data-visual-test="skeleton-exclude"] .dnb-button',
      simulate: 'click',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match all components - vertical', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '60rem' },
      selector: '[data-visual-test="skeleton-all-vertical"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match all components - horizontal', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '60rem' },
      selector: '[data-visual-test="skeleton-all-horizontal"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
