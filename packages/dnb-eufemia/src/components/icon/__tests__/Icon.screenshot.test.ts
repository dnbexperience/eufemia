import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Icon', () => {
  setupPageScreenshot({
    url: '/uilib/components/icon/demos/',
  })

  test('have to match default icons setup', async () => {
    await makeScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-default"]',
    })
  })

  test('have to match inherited sized icons', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="icon-inherit-sized"]',
    })
  })

  test('have to match icons with border', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="icon-border"]',
    })
  })

  test('have to match filled icons', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="icon-filled"]',
    })
  })

  test('have to match icons with colors', async () => {
    await makeScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-colors"]',
    })
  })

  test('have to match icons with sizes', async () => {
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

// eslint-disable-next-line playwright-extras/no-identical-title
test.describe('Icon', () => {
  setupPageScreenshot({
    url: '/uilib/components/icon/visual-tests/',
  })

  test('have to match responsive icons', async () => {
    await makeScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-medium"]',
    })
  })

  test('have to match text alignment', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="icon-alignment"]',
    })
  })

  test('have to match all primary icons', async () => {
    await makeScreenshot({
      style: {
        display: 'inline-flex',
        'flex-wrap': 'wrap',
        width: '30rem',
      },
      selector: '[data-visual-test="icon-all-primary"]',
    })
  })

  test('have to match all secondary icons', async () => {
    await makeScreenshot({
      style: {
        display: 'inline-flex',
        'flex-wrap': 'wrap',
        width: '30rem',
      },
      selector: '[data-visual-test="icon-all-secondary"]',
    })
  })

  test('have to match all primary icons with color', async () => {
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

  test('have to match all secondary icons with color', async () => {
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
