/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  isCI,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

if (isCI) {
  jest.setTimeout(20e3)
}

describe.each(['ui', 'sbanken'])('FormRow for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/layout/form-row/demos',
  })

  it('have to match vertical form-row label', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="form-row-vertical-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match legend usage', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="form-row-legend"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match vertical form-row', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="form-row-vertical"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match horizontal form-row', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="form-row-horizontal-no_wrap"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match horizontal wrap', async () => {
    const screenshot = await makeScreenshot({
      style: {
        width: '50rem',
      },
      selector: '[data-visual-test="form-row-horizontal-wrap"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a combined form-row', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="form-row-combined"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  const wrapperStyle = {
    overflow: 'hidden',
  }

  it('have to match "horizontal direction" with all components', async () => {
    const screenshot = await makeScreenshot({
      wrapperStyle,
      selector: '[data-visual-test="form-row-all-horizontal-direction"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "vertical direction" with all components', async () => {
    const screenshot = await makeScreenshot({
      wrapperStyle,
      selector: '[data-visual-test="form-row-all-vertical-direction"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "vertical everything" with all components', async () => {
    const screenshot = await makeScreenshot({
      wrapperStyle,
      selector: '[data-visual-test="form-row-all-vertical-everything"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "vertical label direction" with all components', async () => {
    const screenshot = await makeScreenshot({
      wrapperStyle,
      selector:
        '[data-visual-test="form-row-all-vertical-label-direction"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "vertical label direction" (no label) with all components', async () => {
    const screenshot = await makeScreenshot({
      wrapperStyle,
      selector:
        '[data-visual-test="form-row-all-vertical-label-direction-no-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match centered form-row', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="form-row-centered"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match all stretch components', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="form-row-all-stretch-components"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
