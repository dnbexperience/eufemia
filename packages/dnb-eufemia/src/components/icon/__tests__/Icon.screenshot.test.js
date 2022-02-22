/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Icon screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/icon/demos',
  })

  it('have to match default icons setup', async () => {
    const screenshot = await testPageScreenshot({
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
    const screenshot = await testPageScreenshot({
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
    const screenshot = await testPageScreenshot({
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
    const screenshot = await testPageScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-colors"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match responsive icons', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-medium"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Icon screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/icon/demos',
  })

  it('have to match all primary icons', async () => {
    const screenshot = await testPageScreenshot({
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
    const screenshot = await testPageScreenshot({
      style: {
        display: 'inline-flex',
        'flex-wrap': 'wrap',
        width: '30rem',
      },
      selector: '[data-visual-test="icon-all-secondary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
