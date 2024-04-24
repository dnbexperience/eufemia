/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Flex.Stack', () => {
  setupPageScreenshot({
    url: '/uilib/layout/flex/stack/demos/',
  })

  it('have to match flex-stack-form', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="flex-stack-form"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match flex-stack-paragraphs', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="flex-stack-paragraphs"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match flex-stack-card-stack', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="flex-stack-card-stack"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match flex-stack-card-heading', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="flex-stack-card-heading"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match flex-stack-card-two-headings', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="flex-stack-card-two-headings"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
