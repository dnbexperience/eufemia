/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('ChildrenWithAge for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/extensions/forms/blocks/ChildrenWithAge/demos',
  })

  it('have to match when answering yes to all options', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="children-with-age-prefilled"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match field and value when multiple children', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="children-with-age-summary-multiple-children"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match field and value when no children', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="children-with-age-summary-no-children"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match field and value when multiple no answers', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="children-with-age-summary-multiple-no-answers"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match field and value when showEmpty', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="children-with-age-summary-show-empty"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match field and value when showEmpty is false', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="children-with-age-summary-show-empty-false"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('ChildrenWithAge', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/blocks/ChildrenWithAge/demos',
    pageViewport: {
      width: 480, // 30rem
    },
  })

  it('have to match small screens', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="children-with-age-prefilled"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
