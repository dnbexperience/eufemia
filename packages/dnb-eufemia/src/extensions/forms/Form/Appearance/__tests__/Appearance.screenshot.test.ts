import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Form.Appearance for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/extensions/forms/Form/Appearance/demos',
  })

  it('have to match size', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="form-appearance-size"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match size nested', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="form-appearance-size-nested"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
