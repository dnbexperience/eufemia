import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Popover (%s theme)', (themeName) => {
  const style = {
    'margin-left': '220px',
    'padding-bottom': '200px',
    'padding-right': '220px',
  }

  setupPageScreenshot({
    url: '/uilib/components/popover/demos',
    themeName,
  })

  it('matches the basic style', async () => {
    const screenshot = await makeScreenshot({
      style,
      simulate: 'click',
      simulateSelector: '[data-visual-test="popover-basic"] button',
      selector: '[data-visual-test="popover-basic"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('matches the dark theme style', async () => {
    const screenshot = await makeScreenshot({
      style,
      simulate: 'click',
      simulateSelector: '[data-visual-test="popover-dark"] button',
      selector: '[data-visual-test="popover-dark"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
