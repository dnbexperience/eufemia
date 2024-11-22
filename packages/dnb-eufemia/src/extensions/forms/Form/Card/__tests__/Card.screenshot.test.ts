/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import { makeScreenshot } from '../../../../../core/jest/jestSetupScreenshots'

const url = '/uilib/extensions/forms/Form/Card/demos'

describe('Form.Card', () => {
  it('have to match outset', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="forms-card"]',
      wrapperStyle: {
        padding: '2rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe.each(['ui', 'sbanken'])(
  'Card small screen for %s',
  (themeName) => {
    const params = {
      themeName,
      pageViewport: {
        width: 400,
      },
      url,
    }

    it('have to match outset', async () => {
      const screenshot = await makeScreenshot({
        ...params,
        selector: '[data-visual-test="forms-card"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
)
