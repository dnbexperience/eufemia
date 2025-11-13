import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Popover (%s theme)', (themeName) => {
  const pageViewport = { width: 400 }
  const style = { width: '360px', height: '260px' }

  setupPageScreenshot({
    url: '/uilib/components/popover/demos',
    themeName,
    pageViewport,
  })

  it('matches the basic example state', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="popover-opened"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
