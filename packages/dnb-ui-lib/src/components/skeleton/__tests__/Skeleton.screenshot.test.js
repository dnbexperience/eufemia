/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Skeleton screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/skeleton/demos' })
  it('have to match excluded components', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="skeleton-exclude"]',
      waitBeforeSimulate: 10
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match a removed skeleton', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="skeleton-exclude"]',
      simulateSelector: '[data-dnb-test="skeleton-exclude"] .dnb-button',
      simulate: 'click'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match all components - vertical', async () => {
    const screenshot = await testPageScreenshot({
      // style: { width: '20rem' },
      selector: '[data-dnb-test="skeleton-all-vertical"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match all components - horizontal', async () => {
    const screenshot = await testPageScreenshot({
      // style: { width: '20rem' },
      selector: '[data-dnb-test="skeleton-all-horizontal"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
