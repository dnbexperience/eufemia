import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe.each(['ui'])('PhoneNumber for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/extensions/forms/feature-fields/PhoneNumber/demos',
    each: true,
  })

  it('have to match with a label', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="phone-number-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
