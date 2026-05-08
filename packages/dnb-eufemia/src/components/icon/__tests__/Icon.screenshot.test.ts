import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('Icon', () => {
  setupPageScreenshot({
    url: '/uilib/components/icon/demos/',
  })

  test('have to match default icons setup', async () => {
    const screenshot = await makeScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-default"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match inherited sized icons', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="icon-inherit-sized"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match icons with border', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="icon-border"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match filled icons', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="icon-filled"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match icons with colors', async () => {
    const screenshot = await makeScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-colors"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match icons with sizes', async () => {
    const screenshot = await makeScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-sizes"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})

// eslint-disable-next-line jest/no-identical-title
test.describe('Icon', () => {
  setupPageScreenshot({
    url: '/uilib/components/icon/visual-tests/',
  })

  test('have to match responsive icons', async () => {
    const screenshot = await makeScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-medium"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match text alignment', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="icon-alignment"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match all primary icons', async () => {
    const screenshot = await makeScreenshot({
      style: {
        display: 'inline-flex',
        'flex-wrap': 'wrap',
        width: '30rem',
      },
      selector: '[data-visual-test="icon-all-primary"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match all secondary icons', async () => {
    const screenshot = await makeScreenshot({
      style: {
        display: 'inline-flex',
        'flex-wrap': 'wrap',
        width: '30rem',
      },
      selector: '[data-visual-test="icon-all-secondary"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match all primary icons with color', async () => {
    const screenshot = await makeScreenshot({
      style: {
        display: 'inline-flex',
        'flex-wrap': 'wrap',
        width: '30rem',
        color: 'tomato',
      },
      selector: '[data-visual-test="icon-all-primary"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match all secondary icons with color', async () => {
    const screenshot = await makeScreenshot({
      style: {
        display: 'inline-flex',
        'flex-wrap': 'wrap',
        width: '30rem',
        color: 'blue',
      },
      selector: '[data-visual-test="icon-all-secondary"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
