import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/jest/jestSetupScreenshots'

const url = '/uilib/extensions/forms/create-component/ValueBlock/demos/'

describe.each(['ui', 'sbanken'])('ValueBlock for %s', (themeName) => {
  setupPageScreenshot({
    url,
    themeName,
  })

  it('have to match inline value', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="value-block-inline"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
