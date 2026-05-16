import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Icon', () => {
  setupPageScreenshot({
    url: '/uilib/components/icon/demos/',
  })

  it('have to match default icons setup', async () => {
    await makeScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-default"]',
    })
  })

  it('have to match inherited sized icons', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="icon-inherit-sized"]',
    })
  })

  it('have to match icons with border', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="icon-border"]',
    })
  })

  it('have to match filled icons', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="icon-filled"]',
    })
  })

  it('have to match icons with colors', async () => {
    await makeScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-colors"]',
    })
  })

  it('have to match icons with sizes', async () => {
    await makeScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-sizes"]',
    })
  })
})

// eslint-disable-next-line vitest/no-identical-title
describe('Icon', () => {
  setupPageScreenshot({
    url: '/uilib/components/icon/visual-tests/',
  })

  it('have to match responsive icons', async () => {
    await makeScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-medium"]',
    })
  })

  it('have to match text alignment', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="icon-alignment"]',
    })
  })

  it('have to match all primary icons', async () => {
    await makeScreenshot({
      style: {
        display: 'inline-flex',
        'flex-wrap': 'wrap',
        width: '30rem',
      },
      selector: '[data-visual-test="icon-all-primary"]',
    })
  })

  it('have to match all secondary icons', async () => {
    await makeScreenshot({
      style: {
        display: 'inline-flex',
        'flex-wrap': 'wrap',
        width: '30rem',
      },
      selector: '[data-visual-test="icon-all-secondary"]',
    })
  })

  it('have to match all primary icons with color', async () => {
    await makeScreenshot({
      style: {
        display: 'inline-flex',
        'flex-wrap': 'wrap',
        width: '30rem',
        color: 'tomato',
      },
      selector: '[data-visual-test="icon-all-primary"]',
    })
  })

  it('have to match all secondary icons with color', async () => {
    await makeScreenshot({
      style: {
        display: 'inline-flex',
        'flex-wrap': 'wrap',
        width: '30rem',
        color: 'blue',
      },
      selector: '[data-visual-test="icon-all-secondary"]',
    })
  })
})
