/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Icon', () => {
  setupPageScreenshot({
    url: '/uilib/components/icon/demos',
  })

  it('have to match default icons setup', async () => {
    const screenshot = await makeScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match inherited sized icons', async () => {
    const screenshot = await makeScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-inherit-sized"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match icons with border', async () => {
    const screenshot = await makeScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-border"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match icons with colors', async () => {
    const screenshot = await makeScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-colors"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

// eslint-disable-next-line jest/no-identical-title
describe('Icon', () => {
  setupPageScreenshot({
    url: '/uilib/components/icon/visual-tests',
  })

  it('have to match responsive icons', async () => {
    const screenshot = await makeScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-medium"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match text alignment', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="icon-alignment"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match all primary icons', async () => {
    const screenshot = await makeScreenshot({
      style: {
        display: 'inline-flex',
        'flex-wrap': 'wrap',
        width: '30rem',
      },
      selector: '[data-visual-test="icon-all-primary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match all secondary icons', async () => {
    const screenshot = await makeScreenshot({
      style: {
        display: 'inline-flex',
        'flex-wrap': 'wrap',
        width: '30rem',
      },
      selector: '[data-visual-test="icon-all-secondary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match all primary icons with color', async () => {
    const screenshot = await makeScreenshot({
      style: {
        display: 'inline-flex',
        'flex-wrap': 'wrap',
        width: '30rem',
        color: 'tomato',
      },
      selector: '[data-visual-test="icon-all-primary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match all secondary icons with color', async () => {
    const screenshot = await makeScreenshot({
      style: {
        display: 'inline-flex',
        'flex-wrap': 'wrap',
        width: '30rem',
        color: 'blue',
      },
      selector: '[data-visual-test="icon-all-secondary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
