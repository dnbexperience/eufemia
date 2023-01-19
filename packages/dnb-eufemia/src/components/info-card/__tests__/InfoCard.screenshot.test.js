/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('InfoCard ', () => {
  setupPageScreenshot({ url: '/uilib/components/info-card/demos' })

  it('renders correct default component', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="info-card-basic"] .dnb-info-card',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('renders correct component with title and buttons', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="info-card-buttons"] .dnb-info-card',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('renders correct component with close button', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '30rem' },
      selector:
        '[data-visual-test="info-card-close-button"] .dnb-info-card',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('renders correct component with accept button', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '30rem' },
      selector:
        '[data-visual-test="info-card-accept-button"] .dnb-info-card',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('renders the centered component', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '30rem' },
      selector:
        '[data-visual-test="info-card-buttons-centered"] .dnb-info-card',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('renders the centered card component', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="info-card-centered"] .dnb-info-card',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('renders with custom icon', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '30rem' },
      selector:
        '[data-visual-test="info-card-custom-icon"] .dnb-info-card',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('renders with custom image', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '30rem' },
      selector:
        '[data-visual-test="info-card-custom-image"] .dnb-info-card',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('renders with custom image centered', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '30rem' },
      selector:
        '[data-visual-test="info-card-custom-image-centered"] .dnb-info-card',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
