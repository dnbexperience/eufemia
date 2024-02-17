import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Form.Theme for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/extensions/forms/extended-features/Form/Theme/demos',
  })

  it('have to match size', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="form-theme-size"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match size nested', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="form-theme-size-nested"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
