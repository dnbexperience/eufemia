/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Timeline ', () => {
  setupPageScreenshot({ url: '/uilib/components/timeline/demos' })

  it('have to match Timeline single completed', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="timeline-single-completed"] .dnb-timeline',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Timeline single current', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="timeline-single-current"] .dnb-timeline',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Timeline single upcoming', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="timeline-single-upcoming"] .dnb-timeline',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Timeline multiple', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="timeline-multiple"] .dnb-timeline',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Timeline multiple with children', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="timeline-multiple-children"] .dnb-timeline',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Timeline with multiple completed time ine items', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="timeline-multiple-completed"] .dnb-timeline',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Timeline with multiple upcoming timeline items', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="timeline-multiple-upcoming"] .dnb-timeline',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Timeline with multiple current timeline items', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="timeline-multiple-current"] .dnb-timeline',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Timeline states', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="timeline-states"] .dnb-timeline',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Timeline icons', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="timeline-icons"] .dnb-timeline',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Timeline icons', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="timeline-icons"] .dnb-timeline',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Timeline skeleton', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="timeline-skeleton"] .dnb-timeline',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Timeline as children skeleton', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="timeline-children-skeleton"] .dnb-timeline',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Timeline item skeleton', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="timeline-item-skeleton"] .dnb-timeline',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
