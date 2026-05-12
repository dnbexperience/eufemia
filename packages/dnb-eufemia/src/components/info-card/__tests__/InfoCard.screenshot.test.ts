import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`InfoCard for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/info-card/demos/',
  })

  it('renders correct default component', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="info-card-basic"] .dnb-info-card',
    })
  })

  it('renders correct stretched component', async () => {
    await makeScreenshot({
      style: { width: '60rem' },
      selector: '[data-visual-test="info-card-stretch"]',
    })
  })

  it('renders correct component with title and buttons', async () => {
    await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="info-card-buttons"] .dnb-info-card',
    })
  })

  it('renders correct component with close button', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector:
        '[data-visual-test="info-card-close-button"] .dnb-info-card',
    })
  })

  it('renders correct component with accept button', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector:
        '[data-visual-test="info-card-accept-button"] .dnb-info-card',
    })
  })

  it('renders the centered component', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector:
        '[data-visual-test="info-card-buttons-centered"] .dnb-info-card',
    })
  })

  it('renders the centered card component', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="info-card-centered"] .dnb-info-card',
    })
  })

  it('renders with custom icon', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector:
        '[data-visual-test="info-card-custom-icon"] .dnb-info-card',
    })
  })

  it('renders with custom image', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector:
        '[data-visual-test="info-card-custom-image"] .dnb-info-card',
    })
  })

  it('renders with custom image centered', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector:
        '[data-visual-test="info-card-custom-image-centered"] .dnb-info-card',
    })
  })

  it('renders with children', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="info-card-children"] .dnb-info-card',
    })
  })
})
