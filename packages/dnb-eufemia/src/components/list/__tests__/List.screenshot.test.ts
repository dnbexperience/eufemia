import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`List for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/list/demos',
  })

  it('have to match slots list', async () => {
    await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="list-slots"]',
    })
  })

  it('have to match action list', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-action"]',
    })
  })

  it('have to match action list in hover state', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-action"]',
      simulate: 'hover',
    })
  })

  it('have to match action list with href', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-action-href"]',
    })
  })

  it('have to match action list with href in hover state', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-action-href"]',
      simulateSelector:
        '[data-visual-test="list-action-href"] li:last-of-type',
      simulate: 'hover',
    })
  })

  it('have to match accordion list', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-accordion"]',
    })
  })

  it('have to match pending list', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-pending"]',
    })
  })

  it('have to match footer list with buttons', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-footer"]',
    })
  })

  it('have to match list overline', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-overline"]',
    })
  })

  it('have to match list subline', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-subline"]',
    })
  })

  it('have to match list inside card', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-card"]',
    })
  })

  it('have to match list inside card without scroll view', async () => {
    await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-card-no-scroll-view"]',
    })
  })
})

describe.each(['ui'])(`List for %s on small viewport`, (themeName) => {
  const smallViewport = { width: 400, height: 600 }

  setupPageScreenshot({
    themeName,
    pageViewport: smallViewport,
    url: '/uilib/components/list/demos',
  })

  it('have to match separated list', async () => {
    await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="list-separated"]',
    })
  })

  it('have to match avatar list', async () => {
    await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="list-avatar"]',
    })
  })

  it('have to match form elements list', async () => {
    await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="list-form-elements"]',
    })
  })

  it('have to match list overline', async () => {
    await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="list-overline"]',
    })
  })

  it('have to match list subline', async () => {
    await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="list-subline"]',
    })
  })
})
