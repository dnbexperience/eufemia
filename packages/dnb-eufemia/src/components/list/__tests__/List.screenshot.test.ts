/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('List for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/list/demos',
  })

  it('have to match slots list', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="list-slots"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match action list', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-action"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match action list in hover state', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-action"]',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match action list with href', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-action-href"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match action list with href in hover state', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-action-href"]',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match accordion list', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-accordion"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match pending list', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-pending"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match footer list with buttons', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-footer"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match list overline', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-overline"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match list subline', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-subline"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match list inside card', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="list-card"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe.each(['ui'])('List for %s on small viewport', (themeName) => {
  const smallViewport = { width: 400, height: 600 }

  setupPageScreenshot({
    themeName,
    pageViewport: smallViewport,
    url: '/uilib/components/list/demos',
  })

  it('have to match separated list', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="list-separated"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match avatar list', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="list-avatar"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match form elements list', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="list-form-elements"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match list overline', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="list-overline"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match list subline', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="list-subline"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
